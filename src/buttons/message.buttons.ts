const ButtonsWithMsg = (url: string) => {
  return {
    reply_markup: {
      inline_keyboard: [
        [{text: 'see answers', callback_data: "get answer"}, { text: "go to StackOwerflow", url }],
      ]
    }
  }
}

export default ButtonsWithMsg;