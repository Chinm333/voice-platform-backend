function getRequiredEnv(name) {
    const value = process.env[name];

    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }

    return value;
}

export async function startBolnaCall({ name, role, phone }) {
    const response = await fetch("https://api.bolna.ai/call", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${getRequiredEnv("BOLNA_API_KEY")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            agent_id: getRequiredEnv("BOLNA_AGENT_ID"),
            recipient_phone_number: phone,
            user_data: {
                name,
                role,
            },
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.message || data?.error || "Bolna call request failed.");
    }

    return data;
}
