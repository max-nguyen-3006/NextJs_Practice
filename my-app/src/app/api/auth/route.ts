export async function POST(request: Request) {
  const res = await request.json();
  const sessionToken = res.sessionToken;
  console.log(sessionToken);
  
  
  if (!sessionToken) {
    return Response.json(
      { messsage: "Something went wrong" },
      {
        status: 400,
      }
    );
  }
  console.log(res.payload);
  
  return Response.json(res, {
    status: 200,
    headers: {
      "Set-Cookie": `sessionToken=${sessionToken}; Path=/; HttpOnly`,
    },
  });
}
