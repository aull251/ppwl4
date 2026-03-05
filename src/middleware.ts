import { Elysia, t } from "elysia";
import { openapi } from "@elysiajs/openapi";

const app = new Elysia().use(openapi());
// Global Logger
app.onRequest(({ request }) => {
    console.log("📥", request.method, request.url);
    console.log("🕒", new Date().toISOString());
});

app.get("/", () => "APASI");

app.get(
    "/admin",
    () => {
    return {
        stats: 99,
    };
    },
    {
    headers: t.Object({
        authorization: t.String(),
    }),
    beforeHandle({ headers, set }) {
        if (headers.authorization !== "Bearer 123") {
        set.status = 401;
        return {
            success: false,
            message: "Unauthorized",
            };
        }
    },
    },
);

app.onAfterHandle(({ response }) => {
    return {
        success: true,
        Message: "data tersedia",
        data: response,
    };
});

app.get("/product", () => {
    return { id: 1, name: "Laptop" };
});

app.listen(3000);
console.log("Server running at http://localhost:3000");
