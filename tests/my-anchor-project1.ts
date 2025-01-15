//its working good 1/2/2024 start here 

// import * as anchor from "@coral-xyz/anchor";
// import { Program } from "@coral-xyz/anchor";
// // /import { MySohail } from "../target/types/my_anchor_project1";
// import { MySohail } from "../target/types/my_sohail";

// describe("my-anchor-project1", () => {
//   anchor.setProvider(anchor.AnchorProvider.env());
//   const program = anchor.workspace.MySohail as Program<MySohail>;
//   const provider = anchor.AnchorProvider.env();
//   const stateAccount = anchor.web3.Keypair.generate();

//   it("Initializes the state account", async () => {
//     const tx = await program.methods
//       .initialize()
//       .accounts({
//         state: stateAccount.publicKey,
//         owner: provider.wallet.publicKey,
//         systemProgram: anchor.web3.SystemProgram.programId,
//       })
//       .signers([stateAccount])
//       .rpc();

//     console.log("State account initialized. Transaction signature:", tx);
//   });

//   it("Deposits 0.02 SOL and adds user to whitelist", async () => {
//     const amount = 0.02 * anchor.web3.LAMPORTS_PER_SOL; // 0.02 SOL
  
//     // Send the deposit transaction
//     const tx = await program.methods
//       .deposit(new anchor.BN(amount))
//       .accounts({
//         state: stateAccount.publicKey,
//         user: provider.wallet.publicKey,
//         systemProgram: anchor.web3.SystemProgram.programId,
//       })
//       .rpc();
  
//     console.log("Deposit transaction signature:", tx);
  
//     // Fetch and verify the whitelist
//     const stateData = await program.account.state.fetch(stateAccount.publicKey);
//     console.log("Whitelist after deposit:", stateData.whitelist);
  
//     if (!stateData.whitelist.some((key) => key.equals(provider.wallet.publicKey))) {
//       throw new Error("User is not whitelisted after deposit!");
//     }
//   });
  
//   it("Withdraws funds to the owner", async () => {
//     const amountToWithdraw = 0.02 * anchor.web3.LAMPORTS_PER_SOL; // Withdraw 0.02 SOL
  
//     const tx = await program.methods
//       .withdraw(new anchor.BN(amountToWithdraw))
//       .accounts({
//         state: stateAccount.publicKey,
//         owner: provider.wallet.publicKey,
//       })
//       .rpc();
  
//     console.log("Withdrawal transaction signature:", tx);
  
//     // Fetch state account balance to verify withdrawal
//     const stateAccountInfo = await provider.connection.getAccountInfo(stateAccount.publicKey);
//     console.log("State account balance after withdrawal:", stateAccountInfo.lamports);
//   });
  
  

//   it("Checks if user is whitelisted", async () => {
//     const isWhitelisted = await program.methods
//       .checkWhitelist(provider.wallet.publicKey)
//       .accounts({
//         state: stateAccount.publicKey,
//       })
//       .rpc();

//     console.log("User is whitelisted:", isWhitelisted);
//   });

//   it("Withdraws funds to the owner with zero balance", async () => {
//     const tx = await program.methods
//       .withdraw(new anchor.BN(0)) // Test withdrawal with 0 SOL
//       .accounts({
//         state: stateAccount.publicKey,
//         owner: provider.wallet.publicKey,
//       })
//       .rpc();

//     console.log("Withdrawal transaction signature (testing with zero balance):", tx);
//   });
// });


//its working good 1/2/2024 end here


//curosre code here its done 5 test successfully 0.02 sol depoite and withdrawal done start here 2/01/2024
import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
// /import { MySohail } from "../target/types/my_anchor_project1";
import { MySohail } from "../target/types/my_sohail";

describe("my-anchor-project1", () => {
  anchor.setProvider(anchor.AnchorProvider.env());
  const program = anchor.workspace.MySohail as Program<MySohail>;
  const provider = anchor.AnchorProvider.env();
  const stateAccount = anchor.web3.Keypair.generate();

  it("Initializes the state account", async () => {
    const tx = await program.methods
      .initialize()
      .accounts({
        state: stateAccount.publicKey,
        owner: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([stateAccount])
      .rpc();

    console.log("State account initialized. Transaction signature:", tx);
  });

  it("Deposits 0.02 SOL and adds user to whitelist", async () => {
    const amount = 0.02 * anchor.web3.LAMPORTS_PER_SOL; // 0.02 SOL
  
    // Send the deposit transaction
    const tx = await program.methods
      .deposit(new anchor.BN(amount))
      .accounts({
        state: stateAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();
  
    console.log("Deposit transaction signature:", tx);
  
    // Fetch and verify the whitelist
    const stateData = await program.account.state.fetch(stateAccount.publicKey);
    console.log("Whitelist after deposit:", stateData.whitelist);
  
    if (!stateData.whitelist.some((key) => key.equals(provider.wallet.publicKey))) {
      throw new Error("User is not whitelisted after deposit!");
    }
  });
  
  it("Withdraws funds to the owner", async () => {
    const amountToWithdraw = 0.02 * anchor.web3.LAMPORTS_PER_SOL; // Withdraw 0.02 SOL
  
    const tx = await program.methods
      .withdraw(new anchor.BN(amountToWithdraw))
      .accounts({
        state: stateAccount.publicKey,
        owner: provider.wallet.publicKey,
      })
      .rpc();
  
    console.log("Withdrawal transaction signature:", tx);
  
    // Fetch state account balance to verify withdrawal
    const stateAccountInfo = await provider.connection.getAccountInfo(stateAccount.publicKey);
    console.log("State account balance after withdrawal:", stateAccountInfo.lamports);
  });
  
  

  it("Checks if user is whitelisted", async () => {
    const isWhitelisted = await program.methods
      .checkWhitelist(provider.wallet.publicKey)
      .accounts({
        state: stateAccount.publicKey,
      })
      .rpc();

    console.log("User is whitelisted:", isWhitelisted);
  });

  it("Withdraws funds to the owner with zero balance", async () => {
    const tx = await program.methods
      .withdraw(new anchor.BN(0)) // Test withdrawal with 0 SOL
      .accounts({
        state: stateAccount.publicKey,
        owner: provider.wallet.publicKey,
      })
      .rpc();

    console.log("Withdrawal transaction signature (testing with zero balance):", tx);
  });
});


//curosre code here its done 5 test successfully 0.02 sol depoite and withdrawal done end  here 2/01/2024






