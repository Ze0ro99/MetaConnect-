## Installation and Usage

### Setting up a Virtual Environment (Optional)
1. Create a virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate # Linux/macOS
    venv\Scripts\activate # Windows
    ```

### Installing Required Libraries
2. Install the required libraries:
    ```bash
    pip install -r requirements.txt
    ```

### Connecting to Pi Network
3. Use the following script to connect to the Pi Network:
    ```python
    from stellar_sdk import Server

    try:
        server = Server(horizon_url="https://api.testnet.minepi.com")
        response = server.ledgers().limit(1).order(desc=True).call()
        print("Connected to Pi Network Testnet!")
        print("Latest Ledger Sequence:", response["_embedded"]["records"][0]["sequence"])
    except Exception as e:
        print("Failed to connect to the testnet:", str(e))
    ```

### Sending Transactions on Pi Network
4. Use the following script to send transactions:
    ```python
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
            asset_code="Pi"
        ).build()

        transaction.sign(sender_keypair)
        response = server.submit_transaction(transaction)
        print("Transaction successful! Hash:", response["hash"])

    # Example usage
    if __name__ == "__main__":
        send_transaction("PRIVATE_KEY_SENDER", "GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", 10)
    ```

### Running Automated Tests with Pytest
5. Use the following script for automated testing with Pytest:
    ```python
    from stellar_sdk import Server
    import pytest

    def test_connection():
        server = Server("https://api.testnet.minepi.com")
        response = server.ledgers().limit(1).order(desc=True).call()
        assert "sequence" in response["_embedded"]["records"][0]

    def test_send_transaction(mocker):
        mocker.patch('send_transaction', return_value={"hash": "dummy_hash"})
        response = send_transaction("PRIVATE_KEY_SENDER", "GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", 10)
        assert response["hash"] == "dummy_hash"

    if __name__ == "__main__":
        pytest.main()
    ```

#### 3. Save Changes and Push to Repository
Save the changes and push them to your repository:
```bash
git add requirements.txt README.md
git commit -m "Add installation instructions and update README.md"
git push origin main