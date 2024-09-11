import MockAdapter from "axios-mock-adapter";
import api from ".";

const mock = new MockAdapter(api);

function extractNameFromEmail(email: string) {
  // Regular expression to match the part before @ and stop at . or -
  const match = email.match(/^([^@.-]+)[@.-]?/);

  return match ? match[1] : "Doe";
}

mock.onPost("/login").reply((config) => {
  const requestData = JSON.parse(config.data);

  return [
    200, // Status code
    {
      user: {
        id: crypto.randomUUID(),
        firstName: extractNameFromEmail(requestData.email),
        email: requestData.email,
        token: crypto.randomUUID(),
      },
    },
  ];
});

mock.onPost("/signup").reply((config) => {
  const requestData = JSON.parse(config.data);
  return [
    200, // Status code
    {
      user: {
        id: crypto.randomUUID(),
        ...requestData,
        password: "redacted",
        confirmPassword: "redacted",
      },
    },
  ];
});

export default mock;
