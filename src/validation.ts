import { Elysia, t } from "elysia";
import { openapi } from "@elysiajs/openapi";

const app = new Elysia()
  .use(openapi())
  .post("/request",
    ({ body }) => {
      return {
        message: "Success",
        data: body
      }
    },
    {
      body: t.Object({
        name: t.String({ minLength: 3 }),
        email: t.String({ format: "email" }),
        age: t.Number({ minimum: 18 })
      })
    }
  )

  .get("/products/:id", ({ params, query }) => {
    return {
        status: "success",
        data: {
            productId: params.id,
            sortOrder: query.sort
        }
    };
}, {
    params: t.Object({
        id: t.Numeric() // Menggunakan t.Numeric agar string dari URL otomatis jadi number
    }),
    query: t.Object({
        sort: t.Enum({
            asc: "asc",
            desc: "desc"
        })
    })
})

  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);