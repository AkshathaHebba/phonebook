const appVersionPrefix = APP_VERSION ? `/${APP_VERSION}` : '';

export default async function request({ url, body, method = 'GET' }) {
    // Default options are marked with *
    const response = await fetch(`${appVersionPrefix}${url}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        // body data type must match "Content-Type" header
        body: JSON.stringify(body),
    });
    // parses JSON response into native JavaScript objects
    return response.json();
}
