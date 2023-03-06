const start = document.getElementById('start')
start.addEventListener('click', () => {
    const inputValue = document.getElementById('input').value
    const num = Number(inputValue)
    const array = Array(num).fill(null).map(() => Math.floor(Math.random() * 1000))

    counterSort([...array], bubbleSort)
    document.getElementById('bubble-cycle').innerText = repeats
    document.getElementById('bubble-time').innerText = time

    counterSort([...array], choiceSort)
    document.getElementById('choice-cycle').innerText = repeats
    document.getElementById('choice-time').innerText = time

    counterSort([...array], insertionSort)
    document.getElementById('insertion-cycle').innerText = repeats
    document.getElementById('insertion-time').innerText = time

    counterSort([...array], quickSort)
    document.getElementById('quicksort-cycle').innerText = repeats
    document.getElementById('quicksort-time').innerText = time

    counterSort([...array], counterMergeSort)
    document.getElementById('merge-cycle').innerText = repeats
    document.getElementById('merge-time').innerText = time
})

function counterSort(cb) {
    const startTime = new Date().getTime()
    cb()
    const endTime = new Date().getTime()
    const time = endTime - startTime
    return time
}
// Пузырьковый метод

function bubbleSort(array) {
    let repeats = 0
    for (let n = 0; n < array.length; n++) {
        //let isSorted = true
        for (let i = 0; i < array.length - 1 - n; i++) {
            if (array[i] > array[i + 1]) {
                const buff = array[i]
                array[i] = array[i + 1]
                array[i + 1] = buff
                //isSorted = false
            }
            repeats++
        }
        //if (isSorted) {
        //break
        // }
    }
    return repeats
}

// Сортировка выбором

function choiceSort(array) {
    let repeats = 0
    for (let n = 0; n < array.length; n++) {
        let min = undefined
        let index = null
        for (let i = n; i < array.length; i++) {
            if (min === undefined || array[i] < min) {
                min = array[i]
                index = i
            }
            repeats++
        }
        const buff = array[n]
        array[n] = min
        array[index] = buff
    }
    return repeats
}
//сортировка вставкой

function insertionSort(array) {
    let repeats = 0
    for (let n = 1; n < array.length; n++) {
        for (let i = n - 1; i >= 0; i--) {
            if (array[i] > array[n]) {
                const buff = array[i]
                array[i] = array[n]
                array[n] = buff
            }
            repeats++
        }
    }
    return repeats
}
//Быстрая сортировка

function quickSort(array) {
    let repeats = 0
    function sort(array) {
        if (array < 2) {
            return array
        }
        const index = Math.floor(Math.random() * array.length)
        const currentItem = array[index]

        const more = []
        const less = []

        for (i = 0; i < array.length; i++) {
            repeats++
            if (i === index) {
                continue
            }
            if (array[i] > currentItem) {
                more.push(array[i])
            }
            else {
                less.push(array[i])
            }
        }
        return [
            ...sort(less),
            currentItem,
            ...sort(more)
        ]
    }
    array = sort(array)
    return repeats
}
// Сортировка слиянием

function counterMergeSort(array) {
    let repeats = 0
    array = mergeSort(array)
    function merge(arrayFirst, arraySecond) {
        const arraySort = []
        let i = n = 0
        while (i < arrayFirst.length && n < arraySecond.length) {

            let min
            if (arrayFirst[i] < arraySecond[n]) {
                min = arrayFirst[i]
                i++
            }
            else {
                min = arraySecond[n]
                n++

            }
            arraySort.push(min)

            repeats++
        }

        return [
            ...arraySort,
            ...arrayFirst.slice(i),
            ...arraySecond.slice(n)
        ]
    }
    function mergeSort(array) {

        if (!array || !array.length) {
            return null
        }
        if (array.length <= 1) {
            return array
        }
        const middle = Math.floor(array.length / 2)
        const arrayLeft = array.slice(0, middle)
        const arrayRight = array.slice(middle)
        return merge(mergeSort(arrayLeft), mergeSort(arrayRight))
    }
    return repeats
}



