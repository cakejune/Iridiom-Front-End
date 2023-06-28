import requests

new_phrases = [
"The ball is in your court",
"Bite the hand that feeds you",
"Burn the midnight oil",
"Can’t judge a book by its cover",
"Cross that bridge when you come to it",
"Cry over spilled milk",
"Cry wolf",
"Don’t bite the hand that feeds you",
"Don’t burn your bridges", 
"Don’t put all of your eggs in one basket",
"Fit as a fiddle",
"Get a kick out of",
"Get out of the wrong side of the bed",
"Give someone the benefit of the doubt",
"Go the extra mile",
"He’s got the world on a string",
"Hit the sack",
"In over your head",
"It takes two to tango",
"Jump on the bandwagon",
"Keep something at arm’s length",
"Knock on wood",
"Last straw",
"Let the cat out of the bag",
"Miss the boat",
"No pain, no gain",
"Not playing with a full deck",
"Off the hook",
"Old hat",
"Once in a blue moon",
"Out of the blue",
"Piece of cake",
"Pulling your leg",
"Put a sock in it",
"See eye to eye",
"Steal someone’s thunder",
"Take something with a grain of salt",
"The best thing since sliced bread",
"Throw in the towel",
"Up in the air",
"We’ll cross that bridge when we come to it",
"Wet behind the ears",
"Wouldn’t be caught dead",
"Your guess is as good as mine",
"Bend over backwards",
"Through thick and thin",
"Cut corners",
"The early bird catches the worm",
"Get your act together",
"Hang in there",
"On the ball",
"Sit tight",
"The ball is in your court",
"Through the grapevine",
"Under the weather",
"Bite off more than you can chew",
"Break the bank",
"Bury the hatchet",
"Costs an arm and a leg",
"Cut to the chase"
    # 
]

url = "http://localhost:3000/idioms"

# Get all idioms
response = requests.get(url)
idioms = response.json()

# Iterate through idioms and update the phrases
for i, idiom in enumerate(idioms):
    if i < 60:
        idiom['phrase'] = new_phrases[i]
        update_url = f"{url}/{idiom['id']}"
        requests.put(update_url, json=idiom)
