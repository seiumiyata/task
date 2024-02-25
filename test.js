// タスク管理アプリのデータをローカルストレージから読み込む
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// タスクを追加する関数
function addTask() {
    let taskName = prompt("追加するタスクの名前を入力してください:");
    if (taskName !== null && taskName.trim() !== "") {
        tasks.push({ name: taskName, completed: false });
        displayTasks();
        saveTasks();
    } else {
        alert("タスク名が入力されていません。");
    }
}

// タスクを完了させる関数
function completeTask() {
    let taskIndex = parseInt(prompt("完了にするタスクの番号を入力してください:")) - 1;
    if (isValidTaskIndex(taskIndex)) {
        tasks[taskIndex].completed = true;
        displayTasks();
        saveTasks();
    } else {
        alert("無効なタスク番号です。");
    }
}

// タスクの一覧表示をする関数
function displayTasks() {
    let taskList = document.getElementById("task-list");
    taskList.innerHTML = ""; // タスクリストをリセット

    tasks.forEach((task, index) => {
        let taskItem = document.createElement("li");
        taskItem.textContent = `${index + 1}. ${task.name} - ${task.completed ? '完了' : '未完了'}`;
        taskList.appendChild(taskItem);
    });
}

// タスクを削除する関数
function deleteTask() {
    let taskIndex = parseInt(prompt("削除するタスクの番号を入力してください:")) - 1;
    if (isValidTaskIndex(taskIndex)) {
        tasks.splice(taskIndex, 1);
        displayTasks();
        saveTasks();
    } else {
        alert("無効なタスク番号です。");
    }
}

// タスクの一括削除をする関数
function clearAllTasks() {
    if (confirm("本当に全てのタスクを削除しますか？")) {
        tasks = [];
        displayTasks();
        saveTasks();
    }
}

// タスク番号が有効かどうかをチェックする関数
function isValidTaskIndex(index) {
    return !isNaN(index) && index >= 0 && index < tasks.length;
}

// タスクをローカルストレージに保存する関数
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// メイン関数
function main() {
    document.getElementById("add-task-btn").addEventListener("click", addTask);
    document.getElementById("complete-task-btn").addEventListener("click", completeTask);
    document.getElementById("delete-task-btn").addEventListener("click", deleteTask);
    document.getElementById("clear-all-tasks-btn").addEventListener("click", clearAllTasks);
    displayTasks(); // ページロード時にタスクを表示
}

// アプリの実行
main();
