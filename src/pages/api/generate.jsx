import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const defaultValue = {
      review:  `Write a restaurant review based on these notes: Name: The Blue Wharf Lobster great, noisy service polite, prices good. Review:`,
      table:  `A table summarizing the fruits from Goocrux:\n\nThere are many fruits that were found on the recently discovered planet Goocrux. There are neoskizzles that grow there, which are purple and taste like candy. There are also loheckles, which are a grayish blue fruit and are very tart, a little bit like a lemon. Pounits are a bright green color and are more savory than sweet. There are also plenty of loopnovas which are a neon pink flavor and taste like cotton candy. Finally, there are fruits called glowls, which have a very sour and bitter taste which is acidic and caustic, and a pale orange tinge to them.\n\n| Fruit | Color | Flavor |`,
  };

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

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt().table,
      temperature: 0.5,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    res.status(200).json({ result: completion.data.choices[0].text });
    // console.log(generatePrompt());
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
  return defaultValue;
}

export function thePrompts()
{
  return defaultValue;
}