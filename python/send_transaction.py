from stellar_sdk import Keypair, TransactionBuilder, Network, Server

def send_transaction(private_key_sender, public_key_receiver, amount):
    server = Server("https://api.testnet.minepi.com")
    sender_keypair = Keypair.from_secret(private_key_sender)
    sender_account = server.load_account(account_id=sender_keypair.public_key)
    
    base_fee = server.fetch_base_fee()
    transaction = TransactionBuilder(
        source_account=sender_account,
        network_passphrase=Network.TESTNET_PASSPHRASE,
        base_fee=base_fee
    ).add_text_memo("Test Transaction").append_payment_op(
        destination=public_key_receiver,
        amount=str(amount),
        asset_code="XLM"
    ).build()
    
    transaction.sign(sender_keypair)
    response = server.submit_transaction(transaction)
    print("Transaction successful! Hash:", response["hash"])

# Example usage
if __name__ == "__main__":
    send_transaction("PRIVATE_KEY_SENDER", "PUBLIC_KEY_RECEIVER", 10)