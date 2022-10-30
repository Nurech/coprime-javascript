/**
 * combinations function source:
 * https://medium.com/nerd-for-tech/july-2-generating-k-combinations-with-recursion-in-javascript-71ef2b90b44b
 */
const combinations = (collection, combinationLength) => {
    let head, tail, result = [];
    if (combinationLength > collection.length || combinationLength < 1) {
        return [];
    }
    if (combinationLength === collection.length) {
        return [collection];
    }
    if (combinationLength === 1) {
        return collection.map(element => [element]);
    }
    for (let i = 0; i < collection.length - combinationLength + 1; i++) {
        head = collection.slice(i, i + 1);
        tail = combinations(collection.slice(i + 1), combinationLength - 1);
        for (const element of tail) {
            result.push(head.concat(element));
        }
    }
    return result;
}

/**
 * gcd source:
 * https://www.folkstalk.com/tech/how-to-get-greatest-common-divisor-in-javascript-with-code-examples/
 */
function gcd_two_numbers(x, y) {
    if ((typeof x !== 'number') || (typeof y !== 'number'))
        return false;
    x = Math.abs(x);
    y = Math.abs(y);
    while (y) {
        let t = y;
        y = x % y;
        x = t;
    }
    return x;
}

/**
 * Let m, n be integers. We say that m and n are coprime numbers (or relatively prime) if there
 * exists no integer larger than 1 which divides both n and m. Example: 4 and 9 are coprime, 13
 * and 91 are not (91 is divisible by 13).
 * Prove that if you choose 31 integers from the range of number within [1, 2, 3 . . . , 60], that at least two
 * numbers must be coprime
 */

let numbers = Array.from({length: 60}, (_, i) => i + 1)
let combos = combinations(numbers, 2)

console.log('numbers:', numbers)

let coPrimeCombos = []

for (let combo of combos) {
    if (gcd_two_numbers(combo[0], combo[1]) === 1) {
        coPrimeCombos.push(combo)
    }
}

console.log('combos: ', combos.length)
console.log('coPrimeCombos: ', coPrimeCombos.length)
console.log('combos: ', combos)
console.log('coPrimeCombos: ', coPrimeCombos)

const hasCoPrimes = (coPrimeCombos, randomArr) => {

    let coprimesPair = []
    for (let coprime of coPrimeCombos) {
        if (randomArr.includes(coprime[0]) && randomArr.includes(coprime[1])) {
            coprimesPair.push(coprime)
            if (coprimesPair.length === 1) {
                console.warn('has coprime pair:', coprimesPair, 'randArr:', randomArr)
                break;
            }
        }
    }
}


let evens = Array.from({length: 60}, (_, i) => i + 1).filter(n => n % 2 === 0)
console.log('evens', evens)
let odds = Array.from({length: 60}, (_, i) => i + 1).filter(n => n % 2 !== 0)
console.log('odds', odds)

let arrOfEvensWithOneOdd = [];
for (let odd of odds) {
    arrOfEvensWithOneOdd = [...evens]
    arrOfEvensWithOneOdd.push(odd)
    hasCoPrimes(coPrimeCombos, arrOfEvensWithOneOdd)
    arrOfEvensWithOneOdd = [];
}
