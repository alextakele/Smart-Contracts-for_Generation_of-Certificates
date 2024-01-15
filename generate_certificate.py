import openai
import requests
from PIL import Image, ImageDraw, ImageFont

# Set up OpenAI client
openai.api_key = os.getenv('OPENAI_API_KEY')
# Function for text-to-image generation using DALL-E API
def generate(text):
 res = openai.Image.create(
    prompt=text,
    n=1,
    size="256x256"
 )
 return res["data"][0]["url"]

# Generate certificate base background
prompt = "Create a beautiful certificate background with a white border and a gold ribbon."
image_url = generate(prompt)

# Save the generated image
with open('background.png', 'wb') as f:
 f.write(requests.get(image_url).content)

# Edit the image
background = Image.open('background.png')
draw = ImageDraw.Draw(background)
font = ImageFont.truetype("/usr/share/fonts/dejavu/DejaVuSans-Bold.ttf", 15)
draw.text((10, 10), "Alexander Mengesha", fill=(0, 0, 0))
draw.text((10, 30), "May 10, 2024", fill=(0, 0, 0))
draw.text((10, 50), "10 Academy", fill=(0, 0, 0))

# Save the edited image
background.save('certificate.png')
