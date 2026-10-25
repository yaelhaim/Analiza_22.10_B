console.log("part1");

function extractNumbers(arr) {
    try {
        if (!Array.isArray(arr)) {
            throw new Error("not an array");
        }

        return arr.filter(item =>
            typeof item === "number" && !Number.isNaN(item)
        );

    } catch (error) {
        return 0;
    }
}

console.log(extractNumbers([1, "hi", 5, NaN, 10]));
console.log(extractNumbers("bad"));
console.log("part2");

function sumNumbersSafe(arr) {
    try {
        let arr2 = extractNumbers(arr);

        if (arr2 === 0) {
            throw new Error("not an array");
        }

        let sum = 0;

        for (let i = 0; i < arr2.length; i++) {
            sum += arr2[i];
        }

        return sum;

    } catch (error) {
        console.warn(error.message);
        return 0;
    }
}

console.log(sumNumbersSafe([2, 4, "bad"])); // 6
console.log(sumNumbersSafe("fail")); // 0
console.log("part3");

function filterLargeSums(arrList, minTotal) {
    let newArray = [];
    for (let i = 0; i < arrList.length; i++) {
        if (Array.isArray(arrList[i]) &&
            sumNumbersSafe(arrList[i]) >= minTotal) {
            newArray.push(arrList[i]);
        }
    }
    return newArray;
}

console.log(filterLargeSums([
    [1, 2, 3],
    [10, "bad", 5],
    "fail"
], 10));
console.log("part4");

function summaryStats(arrList) {
    let filteredArray = filterLargeSums(arrList, 10);
    let result = [];

    for (let i = 0; i < filteredArray.length; i++) {
        let sum = sumNumbersSafe(filteredArray[i]);
        let numbers = extractNumbers(filteredArray[i]);
        let average = sum / numbers.length;

        result.push({
            sum: sum,
            average: average
        });
    }

    return result;
}

console.log(summaryStats([
    [1, 2, 3],
    [5, 5, 5],
    [100],
    "bad"
]));
console.log("part5");

function safeCalculator(a, b, operation) {
    if (typeof a !== typeof b) {
        throw new Error("a and b must be the same type");
    }
    if (typeof a !== "number" || typeof b !== "number") {
        throw new Error("a and b must be numbers");
    }
    switch (operation) {
        case "add":
            return a + b;

        case "subtract":
            return a - b;

        case "multiply":
            return a * b;

        case "divide":
            if (b === 0) {
                throw new Error("Cannot divide by zero");
            }
            return a / b;

        default:
            throw new Error("Invalid operation");
    }
}

console.log(safeCalculator(10, 5, "add")); // 15
console.log(safeCalculator(10, 5, "subtract")); // 5
console.log(safeCalculator(10, 5, "multiply")); // 50
console.log(safeCalculator(10, 5, "divide")); // 2