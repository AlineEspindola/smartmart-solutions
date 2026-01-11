export const API_URL = import.meta.env.VITE_API_URL as string || "http://localhost:5000";

export async function getRequest<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) throw new Error("Erro na requisição GET");
  return (await res.json()) as T;
}

export async function postRequest<T, U>(path: string, data: U): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Erro na requisição POST");
  return (await res.json()) as T;
}
