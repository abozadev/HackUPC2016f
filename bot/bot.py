import telebot
import requests

bot = telebot.TeleBot("232155107:AAFTce06jlRC3dtCiA-GfRS7aafJ8KDnpZc")
token_peop = "e020451b79f994b85d8da82f369b0b4783879843e6783c5e5848904ce895908c"
token_car = "0aa89b6ab1ea9bdc2df322f057f3253ad255621ea38b2c11490bc2bd59a6dba7"


@bot.message_handler(commands=['start'])
def send_welcome(message):
    bot.reply_to(message, """Hello, I'm SenseBot and I can update the sensors
data of setyourcityonfire.com, check /help for list of commands. GLHF""")


@bot.message_handler(commands=['help'])
def send_help(message):
    bot.reply_to(message, """ -- List of commands -- \n
/putp <id> <value> Assigns new value <value> to the person flux sensor <id>\n
/putl <id> <value> Assigns new value<value> to the luminocity sensors<id> \n
/putv <id> <value> Assigns new value <value> to the vehicle flux
sensors <id> \n\n/park <id> <value> Assigns new value <value>
to the occupational value of a parking spot.. \n\n/leave <id>
changes from TRUE to FALSE to the parking spot<id> \n""")


@bot.message_handler(commands=['putp'])
def put_people(message):
    txt = message.text
    txt = txt.replace('/putp ', '')
    numS = txt.replace(' ', '/')
    url = 'http://api.sentilo.cloud/data/pstreams/pSensor' + numS
    print(url)
    headers = {"IDENTITY_KEY": token_peop}
    response = requests.put(url, headers=headers)
    print(response.status_code)
    url2 = 'http://api.sentilo.cloud/data/mycars/gent' + numS
    print(url2)
    head = {"IDENTITY_KEY": token_car}
    response2 = requests.put(url2, headers=head)
    print(response2.status_code)
    if response2.status_code == 200:
        bot.reply_to(message, "Yay! you updatet correctly")
    else:
        bot.reply_to(message, "Oh no! Something went wrong :(")


@bot.message_handler(commands=['putl'])
def put_lum(message):
    txt = message.text
    txt = txt.replace('/putl ', '')
    numS = txt.replace(' ', '/')
    url = 'http://api.sentilo.cloud/data/mycars/llum0' + numS
    print(url)
    headers = {"IDENTITY_KEY": token_car}
    response = requests.put(url, headers=headers)
    print(response.status_code)
    if response.status_code == 200:
        bot.reply_to(message, "Yay! you updatet correctly")
    else:
        bot.reply_to(message, "Oh no! Something went wrong :(")


@bot.message_handler(commands=['putv'])
def put_v(message):
    txt = message.text
    txt = txt.replace('/putv ', '')
    numS = txt.replace(' ', '/')
    url = 'http://api.sentilo.cloud/data/mycars/flow' + numS
    print(url)
    headers = {"IDENTITY_KEY": token_car}
    response = requests.put(url, headers=headers)
    print(response.status_code)
    if response.status_code == 200:
        bot.reply_to(message, "Yay! you updatet correctly")
    else:
        bot.reply_to(message, "Oh no! Something went wrong :(")


@bot.message_handler(commands=['park'])
def park(message):
    txt = message.text
    num = txt.replace('/park ', '')
    url = 'http://api.sentilo.cloud/data/mycars/park0' + num + '/true'
    print(url)
    headers = {"IDENTITY_KEY": token_car}
    response = requests.put(url, headers=headers)
    print(response.status_code)
    if response.status_code == 200:
        bot.reply_to(message, "Yay! you updatet correctly")
    else:
        bot.reply_to(message, "Oh no! Something went wrong :(")


@bot.message_handler(commands=['leave'])
def leave(message):
    txt = message.text
    num = txt.replace('/leave ', '')
    url = 'http://api.sentilo.cloud/data/mycars/park0' + num + '/false'
    print(url)
    headers = {"IDENTITY_KEY": token_car}
    response = requests.put(url, headers=headers)
    print(response.status_code)
    if response.status_code == 200:
        bot.reply_to(message, "Yay! you updatet correctly")
    else:
        bot.reply_to(message, "Oh no! Something went wrong :(")


@bot.message_handler(commands=['ping'])
def ping(m):
    bot.reply_to(m, "Pong")

# @bot.message_handler(func=lambda m: True)
# def echo_all(message):
#    bot.reply_to(message, message.text)

bot.polling()
