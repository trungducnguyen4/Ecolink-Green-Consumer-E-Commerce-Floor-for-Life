async function query(data) {
    const response = await fetch(
        "http://localhost:3000/api/v1/prediction/140ae8e9-704b-4685-8867-e2c580d9d721",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );
    const result = await response.json();
    return result;
}

query({"question": "Hey, how are you?"}).then((response) => {
    console.log(response);
});