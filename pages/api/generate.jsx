import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  // const requestText = req.body.requestText || '';
  // if (requestText.trim().length === 0) {
  //   res.status(400).json({
  //     error: {
  //       message: "Please enter literally anything!",
  //     }
  //   });
  //   return;
  // }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(),
      temperature: 0.5,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    res.status(200).json({ result: completion.data.choices[0].text });
    return;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 429) {
        res.status(429).json({
          error: {
            message: "Too many requests!",
          },
        });
      }
    } else {
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
  // res.status(error.response.status).json(error.response.data);
}

function generatePrompt() {
  return `Write a restaurant review based on these notes:

Name: The Blue Wharf
Lobster great, noisy, service polite, prices good

Review:`;
}
