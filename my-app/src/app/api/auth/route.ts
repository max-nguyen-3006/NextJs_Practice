export async function POST(request: Request) {
  const res = await request.json();
  const sessionToken = res.payload?.data.token;
  if (!sessionToken) {
    return Response.json(
      { messsage: "Something went wrong" },
      {
        status: 400,
      }
    );
  }
  console.log(res.payload);
  
  return Response.json(res.payload, {
    status: 200,
    headers: {
      "Set-Cookie": `sessionToken=${sessionToken}; Path=/; HttpOnly`,
    },
  });
}
