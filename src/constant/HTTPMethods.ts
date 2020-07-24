export const GET = "GET" as const;
export const POST = "POST" as const;
export const DELETE = "DELETE" as const;
export const PUT = "PUT" as const;

const methods = { GET, POST, DELETE, PUT };

export type MethodsType = typeof methods[keyof typeof methods];
