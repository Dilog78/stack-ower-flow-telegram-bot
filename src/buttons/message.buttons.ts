const ButtonsWithMsg = (url: string, id: string) => {
  return {
    reply_markup: {
      inline_keyboard: [
        [{text: 'see answers', callback_data: id}, { text: "go to StackOverflow", url }],
      ]
    }
  }
}

export default ButtonsWithMsg;