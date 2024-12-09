async function query(data) {
    const response = await fetch(
        "http://localhost:3000/api/v1/prediction/e3bf097e-13fc-48fb-867e-eca09aed8180",
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