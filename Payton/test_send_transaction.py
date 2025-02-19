from send_transaction import send_transaction
from stellar_sdk import Server

def test_connection():
    server = Server("https://api.testnet.minepi.com")
    response = server.ledgers().limit(1).order(desc=True).call()
    assert "sequence" in response["_embedded"]["records"][0]

def test_send_transaction(mocker):
    mocker.patch('send_transaction.send_transaction', return_value={"hash": "dummy_hash"})
    response = send_transaction("PRIVATE_KEY_SENDER", "PUBLIC_KEY_RECEIVER", 10)
    assert response["hash"] == "dummy_hash"