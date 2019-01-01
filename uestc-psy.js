function random(n,m) {
    return Math.floor(Math.random() * (m - n + 1) + n)
}
//互评答案
const answers = [
    '很棒的答案。',
    '优秀的答案。',
    '我居然没想到这点，实在是太强了。',
    '心思很细腻，继续加油。',
    '这境界太高了，我现在还无法领悟。',
    '如果能把第一点再完善一下就好了。',
    '非常新颖的角度，很喜欢这个答案，表白作者。',
    '实在不知道怎么点评，无法理解，作者的思考远远超过我们大多数人。'
]

function random_answer() {
    return answers[Math.floor(Math.random() * answers.length)]
}

//自评答案
const self_answers = [
    '完全理解了本节课内容，我感觉自己写的很好。',
    '有些地方不是很理解，留给他人评价吧。',
    '我可能没理解对题目的内容，暂时就这么回答吧。'
]

function random_self_answer() {
    return self_answers[Math.floor(Math.random() * self_answers.length)]
}


let answer_count = 0 //需要点评的人数
let finished_count = 0 //已经点评的人数
let next_signal = 0 //记录setTimeout
let curent_quiz = 0 //当前单元数
let unfinished = 0 //未完成的作业

//自评，6000ms
function self_eva() {
    //获取自评按钮
    const self_btns = Array.prototype.slice.call(document.getElementsByTagName('a')).filter((e) => e.innerText === '点击自评')
    //点击自评按钮
    self_btns[0].click()
    //打分，有延迟
    setTimeout(() => {
        //获取打分框
        const ratios = document.getElementsByClassName('d')
        //10分
        ratios[10].click()
    },1000)
    //点击点评框
    setTimeout(() => {
        document.getElementsByClassName('inputtxt')[0].focus()
    },2000)
    //点评
    setTimeout(() => {
        document.getElementsByName('inputtxt')[0].value = random_self_answer()
    },3000)
    //保存答案
    setTimeout(() => {
        document.getElementsByClassName('j-savedraftbtn')[0].click()
    },4000)
    //提交
    setTimeout(() => {
        document.getElementsByClassName('j-submitbtn')[0].click()
    },5000)
    //返回单元列表
    setTimeout(() => {
        document.getElementsByClassName('j-backbtn')[0].click()
    },6000)
}

//平均一个人6000ms
function step() {
    //点评完毕
    if(finished_count >= answer_count) {
        //结束step循环
        clearTimeout(next_signal)
        //返回到上级
        document.getElementsByClassName('j-backbtn')[1].click()
        //获取自评按钮
        const self_btns = Array.prototype.slice.call(document.getElementsByTagName('a')).filter((e) => e.innerText === '点击自评')
        //已经自评过
        if(self_btns.length === 0) {
            //返回单元列表
            setTimeout(() => {
                document.getElementsByClassName('j-backbtn')[0].click()
            },1000)
            //下一单元
            setTimeout(() => {
                eva_init()
            },2000)
            return
        }
        //自评
        self_eva()
        //下一单元，自评需要6000ms
        setTimeout(() => {
            eva_init()
        },7000)
        return
    }
    const ratios = document.getElementsByClassName('d')
    //没有写这个作业，应该也无法提交了，直接结束到下一单元吧
    if(ratios.length === 0) {
        unfinished += 1
        //结束step循环
        clearTimeout(next_signal)
        //返回到上级
        document.getElementsByClassName('j-backbtn')[1].click()
        //下一单元
        setTimeout(() => {
            eva_init()
        },1000)
        return
    }
    //自动9-10分
    ratios[random(9,10)].click()
    //点击点评框，虽然好像没什么用
    setTimeout(() => {
        document.getElementsByName('inputtxt')[0].focus()
    },1000)
    //点评
    setTimeout(() => {
        document.getElementsByName('inputtxt')[0].value = random_answer()
    },2000)
    //保存答案
    setTimeout(() => {
        document.getElementsByClassName('j-savedraftbtn')[0].click()
    },3000)
    //提交
    setTimeout(() => {
        document.getElementsByClassName('j-submitbtn')[0].click()
    },4000)
    //下一个人
    setTimeout(() => {
        document.getElementsByClassName('j-gotonext')[0].click()
    },5000)
    //循环
    next_signal = setTimeout(() => {
        step()
    },6000)
    finished_count += 1
}

//每个单元的初始化
function eva_init() {
    //获取'前往作业'按钮
    const btns = Array.prototype.slice.call(document.getElementsByClassName('j-quizBtn')).filter((e) => e.innerText === '前往作业')
    //全部完毕，结束
    if(curent_quiz >= btns.length) {
        if(unfinished) {
            console.log('你好像有' + unfinished + '个未完成的作业，节哀。')
        }
    }
    //进入单元作业
    btns[curent_quiz].click()
    //需要互评的人数，有延迟
    setTimeout(() => {
        answer_count = 30 - document.getElementsByClassName('j-listtable')[0].childElementCount
    },1000)
    //进入互评，注意如果之前点击过，则a标签是'继续进行互评'，同时读取到的数量会多1个，如果没点击过，则是'开始评分'
    setTimeout(() => {
        const ctn_eva = Array.prototype.slice.call(document.getElementsByTagName('a')).filter((e) => e.innerText === '继续进行互评')
        if(ctn_eva.length === 1){
            answer_count += 1
            ctn_eva[0].click()
        }
        else
            Array.prototype.slice.call(document.getElementsByTagName('a')).filter((e) => e.innerText === '开始评分')[0].click()
    },2000)
    //开始互评
    setTimeout(() => {
        step()
    },3000)
    //准备进入下一个单元
    curent_quiz += 1
}

eva_init()
