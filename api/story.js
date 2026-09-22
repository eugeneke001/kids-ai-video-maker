export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const {
      topic,
      character,
      personality,
      location,
      age,
      style,
      lesson,
      length
    } = req.body;

    const prompt = `
Create an original children's YouTube story.

Story idea: ${topic}
Main character: ${character}
Personality: ${personality}
Location: ${location}
Age group: ${age}
Visual style: ${style}
Lesson: ${lesson}
Length: ${length}

Make the story:
- Safe and appropriate for children
- Fun and imaginative
- Easy to understand
- Positive and educational
- Suitable for YouTube Kids

Return:
1. A title
2. A short description
3. The complete story
4. A list of scenes
5. A visual description for every scene
6. Narration for every scene
`;

    const response = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": Bearer ${process.env.OPENAI_API_KEY}
        },
        body: JSON.stringify({
          model: "gpt-5.6",
          input: prompt
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data
      });
    }

    return res.status(200).json({
      story: data.output_text
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}
