import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { env } from "node:process";
import { File } from "@/models/File";
import { User } from "@/models/User";
import { Summary } from "@/models/Summary";
import { Folder } from "@/models/Folder";
import { Quiz } from "@/models/Quiz";
import { Flashcard } from "@/models/Flashcard";
import { Outline } from "@/models/Outline";
import { Configuration, OpenAIApi } from "openai-edge";

export async function POST(req) {
    const { folderID, files, subject, type } = await req.json();

    console.log(files)

    await connectMongoDB();

    let prompt;
    if(subject == 'Math' && type == 'Summary'){
        prompt = 'Teach me the topics in this content. Elaborate on the topics using your own knowledge. Assume you are creating a comprehensive study guide on these topics.'
    } else if (subject == 'Science' && type == 'Summary'){
        prompt = 'Teach me the topics in this content. Elaborate on the topics using your own knowledge. Assume you are creating a comprehensive study guide on these topics.'
    } else if (subject == 'Humanities' && type == 'Summary'){
        prompt = 'Teach me the topics in this content. Cite textual evidence from the content provided. Give substantial information but do not repeat the same ideas. Elaborate on the topics using your own knowledge.'
    } else if (subject == 'Math' && type == 'Quiz'){
        prompt = 'You are a master at making involved multiple choice questions. Create 5 high-quality multiple choice math questions that require test thorough knowledge of the content that will be provided to you. For each question, give 4 sensible choices, and provide the right answer with an explanation to the problem. The first line for each question must be the question itself. The second, third, fourth and fifth lines should be the lettered choices. The sixth line should be the answer. The seventh line should be the explanation. Follow the same format for EACH question. There must be EXACTLY FIVE questions.'
    } else if (subject == 'Science' && type == 'Quiz'){
        prompt = 'You are a master at making involved multiple choice questions. Create 5 high-quality multiple choice questions that test an extensive knowledge of the content that will be provided to you. For each question, give 4 sensible choices, and provide the right answer with an explanation to the problem. The first line for each question must be the question itself. The second, third, fourth and fifth lines should be the lettered choices. The sixth line should be the answer. The seventh line should be the explanation. Follow the same format for EACH question. There must be EXACTLY FIVE questions.'
    } else if (subject == 'Humanities' && type == 'Quiz'){
        prompt = 'You are a master at making involved multiple choice questions. Create 5 high-quality multiple choice questions that test an extensive knowledge of the content that will be provided to you. For each question, give 4 sensible choices, and provide the right answer with an explanation to the problem. The first line for each question must be the question itself. The second, third, fourth and fifth lines should be the lettered choices. The sixth line should be the answer. The seventh line should be the explanation. Follow the same format for EACH question. There must be EXACTLY FIVE questions.'
    } else if (type == 'Outline'){
        prompt = 'Create a study guide that includes all of the main topics in the content provided.'
    } else if (type == 'Flashcard'){
        prompt = 'You are a master at making flashcards which are useful study material for the content provided. Make as many flashcards as necessary to cover the main topics in the content. For each flashcard, the first line must be the front side and the second line mus tbe the back side.'
    }

    let messages = []

    for(let i = 0; i < files.length; i++){
       let foundFile = await File.findOne({ title: files[i].name }).exec();
       let content = foundFile.content;
       messages.push({"role": "user", "content": content})
    }

    const configuration = new Configuration({
        apiKey: env.key,
    })
    const openai = new OpenAIApi(configuration)
    
    const res = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo-16k',
    messages: [{"role": "system", "content": prompt},
                ...messages
                // {"role": "user", "content": pdf2Text}
            // {"role": "user", "content": "Who won the world series in 2020?"},
            // {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
            // {"role": "user", "content": "Where was it played?"}
        ],
    temperature: 0.0,
    });
    
    let data = await res.json();
    //  as ResponseTypes["createImage"]
    
    if(data.choices[0].message.content) {
        data = data.choices[0].message.content;
    }
    else{
        data = data;
        return NextResponse.json({ data }, { status: 500 });
    }

    if(type == "Flashcard"){
        let title = files[0].name.split('.')[0]

        let arr = data.split('\n')

        arr = arr.filter((item) => item != "")

        console.log(arr)

        let flashcards = []

        for(let i = 0; i < arr.length; i += 2){
            flashcards.push({front: arr[i], back: arr[i+1]})
        }

        const newFlashcards = await Flashcard.create({
            title: title,
            folderAffiliation: folderID,
            filesUsed: files,
            flashcards: flashcards,
        })

        const updatedFolder = await Folder.findByIdAndUpdate(folderID, {
            $push: {
              flashcards:
                newFlashcards._id
            },
          }, {new: true});
          
          console.log(updatedFolder)

        return NextResponse.json({ data: newFlashcards }, {message: "Flashcards successfully created and added to database" }, { status: 201 });
    }
    else if(type ==  "Quiz"){
        let name = files[0].name.split('.')[0]

        let arr = data.split('\n')

        arr = arr.filter((item) => item != "")

        console.log(arr)

        let quiz = [
            {question: arr[0], options: [arr[1], arr[2], arr[3], arr[4]], answer: arr[5], explanation: arr[6]},
            {question: arr[7], options: [arr[8], arr[9], arr[10], arr[11]], answer: arr[12], explanation: arr[13]},
            {question: arr[14], options: [arr[15], arr[16], arr[17], arr[18]], answer: arr[19], explanation: arr[20]},
            {question: arr[21], options: [arr[22], arr[23], arr[24], arr[25]], answer: arr[26], explanation: arr[27]},
            {question: arr[28], options: [arr[29], arr[30], arr[31], arr[32]], answer: arr[33], explanation: arr[34]},
        ]

        const newQuiz = await Quiz.create({
            name: name,
            folderAffiliation: folderID,
            filesUsed: files,
            questions: quiz,
        })

        const updatedFolder = await Folder.findByIdAndUpdate(folderID, {
            $push: {
              quizzes:
                newQuiz._id
            },
          }, {new: true});
          
          console.log(updatedFolder)

        return NextResponse.json({ data: newQuiz }, {message: "Quiz successfully created and added to database" }, { status: 201 });
    } 
    else if(type == "Summary") 
    {
        console.log(folderID)

        let title = files[0].name.split('.')[0]

        const newSummary = await Summary.create({
            title: title,
            folderAffiliation: folderID,
            content: data,
            filesUsed: files,
          });

          const updatedFolder = await Folder.findByIdAndUpdate(folderID, {
            $push: {
              summaries:
                newSummary._id
            },
          }, {new: true});

          console.log(updatedFolder)

        return NextResponse.json({ data: newSummary }, {message: "Summary successfully created and added to database" }, { status: 201 });
    }
    else if(type == "Outline") 
    {
        console.log(folderID)

        let title = files[0].name.split('.')[0]

        const newOutline = await Outline.create({
            title: title,
            folderAffiliation: folderID,
            content: data,
            filesUsed: files,
          });

          const updatedFolder = await Folder.findByIdAndUpdate(folderID, {
            $push: {
              outlines:
                newOutline._id
            },
          }, {new: true});

          console.log(updatedFolder)

        return NextResponse.json({ data: newOutline }, {message: "Outline successfully created and added to database" }, { status: 201 });
    }
    
}
