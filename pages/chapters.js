import Header from "@/components/Header";

const Course = () => {
    return <div className="text-center">
        <Header buttons={[{title: 'Home', 'link': "/home"}]}/>
        <div>
            <h4 className="text-black mt-20 font-medium text-xl">Chapter</h4>
            <div className="grid grid-cols-2 gap-5 my-9 mx-5">
                <button className="border-black border-2 rounded-3xl py-4 text-md">Lesson 1</button>
                <button className="border-black border-2 rounded-3xl py-4 text-md ">Lesson 2</button>
                <button className="border-black border-2 rounded-3xl py-4 text-md">Lesson 3</button>
                <button className="border-black border-2 rounded-3xl py-4 text-md ">Lesson 4</button>
                <button className="border-black border-2 rounded-3xl py-4 text-md">Lesson 5</button>
                <button className="border-black border-2 rounded-3xl py-4 text-md ">Lesson 6</button>
                <button className="border-black border-2 rounded-3xl py-4 text-md">Lesson 7</button>
                <button className="border-black border-2 rounded-3xl py-4 text-md ">Lesson 8</button>
                <button className="border-black border-2 rounded-3xl py-4 text-md">Lesson 9</button>
                <button className="border-black border-2 rounded-3xl py-4 text-md ">Lesson 10</button>
                <button className="border-black border-2 rounded-3xl py-4 text-md">Lesson 11</button>
                <button className="border-black border-2 rounded-3xl py-4 text-md ">Lesson 12</button>
                <button className="border-black border-2 rounded-3xl py-4 text-md">Lesson 13</button>
                <button className="border-black border-2 rounded-3xl py-4 text-md ">Lesson 14</button>
                <button className="border-black border-2 rounded-3xl py-4 text-md">Lesson 15</button>
                <button className="border-black border-2 rounded-3xl py-4 text-md ">Lesson 16</button>
                <button className="border-black border-2 rounded-3xl py-4 text-md">Lesson 17</button>
                <button className="border-black border-2 rounded-3xl py-4 text-md ">Lesson 18</button>
                <button className="border-black border-2 rounded-3xl py-4 text-md">Lesson 19</button>
                <button className="border-black border-2 rounded-3xl py-4 text-md ">Lesson 20</button>
            </div>
        </div>
    </div>
}
export default Course;