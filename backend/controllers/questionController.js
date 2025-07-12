exports.getAllQuestions = (req, res) => {
  res.json([
    { id: 1, title: "How to use Express?", tags: ["express", "node"] },
  ]);
};

exports.addQuestion = (req, res) => {
  const { title, description, tags } = req.body;
  // Normally insert into DB here
  res.status(201).json({ message: "Question added", title });
};
