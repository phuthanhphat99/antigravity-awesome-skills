import express from "express";
import OpenAI from "openai";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: "2mb" }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/generate", async (req, res) => {
  const { apiKey, prompts, size = "1024x1024" } = req.body;

  if (!apiKey || typeof apiKey !== "string") {
    return res.status(400).json({ error: "Thiếu OpenAI API key." });
  }
  if (!Array.isArray(prompts) || prompts.length === 0) {
    return res.status(400).json({ error: "Danh sách prompt trống." });
  }

  const client = new OpenAI({ apiKey });
  const results = [];

  for (let i = 0; i < prompts.length; i += 1) {
    const prompt = String(prompts[i] ?? "").trim();
    if (!prompt) {
      results.push({ index: i, prompt: "", error: "Prompt rỗng, đã bỏ qua." });
      continue;
    }

    try {
      const image = await client.images.generate({
        model: "gpt-image-1",
        prompt,
        size
      });

      const b64 = image.data?.[0]?.b64_json;
      if (!b64) {
        results.push({ index: i, prompt, error: "Không nhận được dữ liệu ảnh." });
        continue;
      }

      results.push({
        index: i,
        prompt,
        imageDataUrl: `data:image/png;base64,${b64}`
      });
    } catch (error) {
      results.push({
        index: i,
        prompt,
        error: error?.message || "Lỗi không xác định"
      });
    }
  }

  return res.json({ results });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Batch Image Generator running at http://localhost:${port}`);
});
