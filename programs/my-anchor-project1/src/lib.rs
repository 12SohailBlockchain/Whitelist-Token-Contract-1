use anchor_lang::prelude::*;
use anchor_lang::solana_program::program::invoke;
use anchor_spl::token::{self, Mint, Token, TokenAccount};

// Program ID
declare_id!("GZtp8KcthweXo1brnJtMvb8EV5bZYK92pWbrCBqiMDom");

#[program]
mod my_sohail {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let state = &mut ctx.accounts.state;
        state.owner = *ctx.accounts.owner.key;
        state.whitelist = vec![];
        Ok(())
    }

    pub fn deposit(ctx: Context<Deposit>, _amount: u64) -> Result<()> {
        let state = &mut ctx.accounts.state;
        let user = &ctx.accounts.user;
    
        // Log current whitelist
        msg!("Whitelist before update: {:?}", state.whitelist);
    
        // Add user to whitelist if not already present
        if !state.whitelist.contains(&user.key()) {
            state.whitelist.push(user.key());
            msg!("User {} added to whitelist.", user.key());
        } else {
            msg!("User {} is already in the whitelist.", user.key());
        }
    
        // Log updated whitelist
        msg!("Whitelist after update: {:?}", state.whitelist);
    
        Ok(())
    }
    
    
    

    pub fn withdraw(ctx: Context<Withdraw>, amount: u64) -> Result<()> {
        let state = &ctx.accounts.state;
    
        // Ensure only the owner can withdraw
        require!(state.owner == *ctx.accounts.owner.key, CustomError::Unauthorized);
    
        // Check if state account has enough balance
        let state_lamports = **ctx.accounts.state.to_account_info().lamports.borrow();
        require!(state_lamports >= amount, CustomError::InsufficientFunds);
    
        // Perform withdrawal
        **ctx.accounts.state.to_account_info().try_borrow_mut_lamports()? -= amount;
        **ctx.accounts.owner.to_account_info().try_borrow_mut_lamports()? += amount;
    
        Ok(())
    }
    

    pub fn check_whitelist(ctx: Context<CheckWhitelist>, user: Pubkey) -> Result<()> {
        let state = &ctx.accounts.state;

        // Check if user is whitelisted
        if !state.whitelist.contains(&user) {
            return Err(CustomError::NotWhitelisted.into());
        }

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = owner, space = 8 + 32 + 4 + (32 * 100))]
    pub state: Account<'info, State>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Deposit<'info> {
    #[account(mut)]
    pub state: Account<'info, State>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Withdraw<'info> {
    #[account(mut)]
    pub state: Account<'info, State>,
    #[account(mut)]
    pub owner: Signer<'info>,
}

#[derive(Accounts)]
pub struct CheckWhitelist<'info> {
    #[account(mut)]
    pub state: Account<'info, State>,
}

#[account]
pub struct State {
    pub owner: Pubkey,
    pub whitelist: Vec<Pubkey>,
}

#[error_code]
pub enum CustomError {
    #[msg("Invalid deposit amount.")]
    InvalidAmount,
    #[msg("Unauthorized access.")]
    Unauthorized,
    #[msg("User is not whitelisted.")]
    NotWhitelisted,
    #[msg("Insufficient funds in the state account.")]
    InsufficientFunds, // Add this variant
}
