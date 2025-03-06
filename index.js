const task=JSON.parse(localStorage.getItem("tasks"))||[]
document.addEventListener("DOMContentLoaded", () => {
  updatetasklist()
  updatestats()
})
const addtask = () => {
  const forminp = document.querySelector(".forminp")
  const text = forminp.value.trim()
  if (text) {
    task.push({ "task": text, "completed": false })
  }
  forminp.value = ""
  savedata()
}
const savedata = () => {
  localStorage.setItem("tasks", JSON.stringify(task))
}

const editTask = (index) => {
  const forminp = document.querySelector(".forminp")
  forminp.value = task[index].task

  task.splice(index, 1)
  savedata()
  updatetasklist()
  updatestats()
}
const deleteTask = (index) => {
  task.splice(index, 1)
  savedata()
  updatetasklist()
  updatestats()
}
const updatestats = () => {
  const taskscompleted = task.filter(task => task.completed).length
  const totaltasks = task.length
  const countdown = document.querySelector(".countdown").innerHTML = ` ${taskscompleted} / ${totaltasks} `
  const progress = (taskscompleted / totaltasks) * 100
  const progressbar = document.querySelector(".progress")
  progressbar.style.width = `${progress}%`
  console.log(taskscompleted);
}
const updatetasklist = () => {
  const chkbox = document.querySelector(".chkbox")
  chkbox.innerHTML = ""
  task.forEach((task, index) => {
    const li = document.createElement("li")
    li.innerHTML = `
        <div class="task-item">
            <div class="task ${task.completed ? "completed" : ""}"> 
                <input type="checkbox" id="tasks" ${task.completed ? "checked" : ""}>
                <p class="inputedtask">${task.task}</p>
            </div>
            <div class="icons">
                <img src="img/edit.png" class="edit" alt="" onClick="editTask(${index})">
                <img src="img/bin.png" class="bin" alt="" onClick="deleteTask(${index})">
            </div>
        </div>
        `
    li.addEventListener("change", () => toggleTaskComplete(index))
    chkbox.append(li)
    
    // console.log(task)
  })
  updatestats()
}
const toggleTaskComplete = (index) => {
  task[index].completed = !task[index].completed
  updatetasklist()
}
document.querySelector("#addtask").addEventListener("click", (e) => {
  e.preventDefault()
  addtask()
  updatetasklist()
})


const blaskconfetti = () => {
  const count = 200,
    defaults = {
      origin: { y: 0.7 },
    };

  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      })
    );
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}