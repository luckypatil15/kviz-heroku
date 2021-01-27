// const { try } = require("bluebird");

var counter = 0;
var mcqImage = false;
var fillImage = false;
var pollImage = false;
// window.onload = async() => {

//     // const data = await getQues();
//     // console.log(data);
// }



function imageFunc() {
    console.log("imageFunc");
    // $("#exampleModalCenter").modal("hide");
    $("#exampleModalCenter").modal("show");
}

function imageFunc1() {
    console.log("imageFunc");
    // $("#exampleModalCenter").modal("hide");
    $("#exampleModalCenter1").modal("show");
}

function imageFunc2() {
    console.log("imageFunc");
    // $("#exampleModalCenter").modal("hide");
    $("#exampleModalCenter2").modal("show");
}

function closeImageModal() {
    $("#exampleModalCenter").modal("hide");
}

function closeImageModal1() {
    $("#exampleModalCenter1").modal("hide");
}

function closeImageModal2() {
    $("#exampleModalCenter2").modal("hide");
}

async function uploadQuestionImage(ele) {
    mcqImage = true;
    let image = document.getElementById("mcq-input-file-now");
    var file_data = $("#mcq-input-file-now").prop("files")[0];
    console.log("file input form" + file_data);
    var formData = new FormData();
    let resp = {};
    formData.append("question_image", file_data);

    let data = await fetch("/api/v1/upload_question_image", {
        method: "POST",
        headers: {
            "Accept": "application/json"
        },
        body: formData, // Setting the data attribute of ajax with file_data

    }).then(response => {
        response = response.json();
        console.log(response);
        console.log(JSON.stringify(response));
        return response;
    });

    const getImage = async() => {
        resp = await data;
        console.log(resp + "resposnse");
        resp = JSON.parse(JSON.stringify(resp));
        console.log(resp + "stringify");
        if (resp) {
            console.log(resp);
            image.value = '';
            file_data.value = '';
            console.log("ii")
            let Qimage = document.getElementById("imgPreview");
            console.log(Qimage);
            // Qimage.style.visibility = "visible";
            Qimage.style.display = "block";
            console.log("body = " + resp.body, +" status " + resp.status);
            let name = resp.body;

            Qimage.src = `/assets/img/${name}`;
            console.log(Qimage);

            $("#exampleModalCenter").modal("hide");


        }
        return resp;

    };

    getImage();
    // $("#exampleModalCenter1").modal("hide");

}

async function uploadFillQImage() {
    fillImage = true;
    let image = document.getElementById("fill-input-file-now");
    var file_data = $("#fill-input-file-now").prop("files")[0];
    console.log("file input form" + file_data);
    var formData = new FormData();
    let resp = {};
    formData.append("question_image", file_data);

    let data = await fetch("/api/v1/upload_question_image", {
        method: "POST",
        headers: {
            "Accept": "application/json"
        },
        body: formData, // Setting the data attribute of ajax with file_data

    }).then(response => {
        response = response.json();
        console.log(response);
        console.log(JSON.stringify(response));
        return response;
    });

    const getImage = async() => {
        resp = await data;
        console.log(resp + "resposnse");
        resp = JSON.parse(JSON.stringify(resp));
        console.log(resp + "stringify");
        if (resp) {
            console.log(resp);
            image.value = '';
            file_data.value = '';
            console.log("ii")
            let Qimage = document.getElementById("imgPreviewFill");
            Qimage.style.display = "block";
            // Qimage.style.visibility = "visible";
            console.log("body = " + resp.body, +" status " + resp.status);
            let name = resp.body;

            Qimage.src = `/assets/img/${name}`;
            console.log("check image in fill upload = "+Qimage);


            // $("fillModal").modal("show");
            $("#exampleModalCenter1").modal("hide");

        }
        return resp;
    }
    getImage();

}
async function uploadPollQImage() {
    let image = document.getElementById("poll-input-file-now");
    var file_data = $("#poll-input-file-now").prop("files")[0];
    console.log("file input form" + file_data);
    var formData = new FormData();
    let resp = {};
    formData.append("question_image", file_data);

    let data = await fetch("/api/v1/upload_question_image", {
        method: "POST",
        headers: {
            "Accept": "application/json"
        },
        body: formData, // Setting the data attribute of ajax with file_data

    }).then(response => {
        response = response.json();
        console.log(response);
        console.log(JSON.stringify(response));
        return response;
    });

    const getImage = async() => {
        resp = await data;
        console.log(resp + "resposnse");
        resp = JSON.parse(JSON.stringify(resp));
        console.log(resp + "stringify");
        if (resp) {
            console.log(resp);
            image.value = '';
            file_data.value = '';
            console.log("ii")
            let Qimage = document.getElementById("imgPreviewPoll");
            // Qimage.style.visibility = "visible";
            Qimage.style.display = "block";
            console.log("body = " + resp.body, +" status " + resp.status);
            let name = resp.body;

            Qimage.src = `/assets/img/${name}`;


            //$("pollModal").modal("show");
            $("#exampleModalCenter2").modal("hide");

        }
        return resp;
    }
    getImage();

}

function tick1(ele) {
    ele.style.color = "green";
    document.getElementById("tick2").style.color = "grey";
    document.getElementById("tick3").style.color = "grey";
    document.getElementById("tick4").style.color = "grey";
    var correct_option = ele.parentElement.parentElement.children[1].firstElementChild.name;
    document.getElementById("correct_option").setAttribute("value", correct_option);
    console.log(document.getElementById("correct_option").value)
}

function tick2(ele) {
    console.log(ele);
    ele.style.color = "green";
    document.getElementById("tick1").style.color = "grey";
    document.getElementById("tick3").style.color = "grey";
    document.getElementById("tick4").style.color = "grey";
    var correct_option = ele.parentElement.parentElement.children[1].firstElementChild.name;
    document.getElementById("correct_option").setAttribute("value", correct_option);
    console.log(document.getElementById("correct_option").value)
}

function tick3(ele) {
    ele.style.color = "green";
    document.getElementById("tick1").style.color = "grey";
    document.getElementById("tick2").style.color = "grey";
    document.getElementById("tick4").style.color = "grey";
    var correct_option = ele.parentElement.parentElement.children[1].firstElementChild.name;
    document.getElementById("correct_option").setAttribute("value", correct_option);
    console.log(document.getElementById("correct_option").value)
}

function tick4(ele) {
    ele.style.color = "green";
    document.getElementById("tick1").style.color = "grey";
    document.getElementById("tick2").style.color = "grey";
    document.getElementById("tick3").style.color = "grey";
    var correct_option = ele.parentElement.parentElement.children[1].firstElementChild.name;
    document.getElementById("correct_option").setAttribute("value", correct_option);
    console.log(document.getElementById("correct_option").value)
}

async function getQues() {
    let resp;
    try {
        await fetch('/api/v1/getquestions', {
            method: "GET",
            headers: {
                "Content-Type": "Application/Json",
                "Access-Control-Allow-Origin": "*",
            },

        }).then(res => {
            resp = res.json();
        });
        console.log("response = " + resp);
        return resp;
    } catch (err) {
        console.log(err);
    }
}

async function mcqajax() {

    let correct_serial = document.getElementById('correct_option').value;
    console.log("correct option = "+correct_serial);
    if(correct_serial == 0){
        console.log("0");
        let alert = document.getElementById('msg');
        alert.style.display = 'block';
        alert.innerHTML = "*Select Correct Option First";
        return;
    }else{
        document.getElementById('msg').innerHTML = "";
        document.getElementById('msg').style.display="none";
    }
    let source;
    let updatebtn = document.getElementById('mcqbutton');
    updatebtn.disabled = true;
    let filename;
    var img = document.getElementById('imgPreview');
    console.log(img);
    if(img.innerHTML== undefined){
        console.log("img is undefined");
        let source = null;
        filename = null;
    } else {
        console.log("img = "+img);

        let src = img.src;
        console.log("img = " + img);
        console.log("src = " + src);
        source = document.getElementById('image1').cloneNode(true);
        console.log("source = " + source);
        source.removeAttribute('id');

        console.log("imageclone = " + source);
        filename = src.split('/');
        filename = filename[filename.length - 1];
        console.log(filename);
        source.innerHTML = filename;
        console.log("source = " + source);

    }



    console.log("in mcq")
    let userComment = document.querySelector("#mcqquestion").value;
    let op1 = document.querySelector("#mcqoption1").value;
    let op2 = document.querySelector("#mcqoption2").value;
    let op3 = document.querySelector("#mcqoption3").value;
    let op4 = document.querySelector("#mcqoption4").value; // we are not using innerHTML wy bcz this is a form element

    console.log(img);


    counter = counter + 1;
    if(source != null || source != undefined){
        source.setAttribute('id', `question${counter}${userComment}`);
        let imageList = document.getElementById("imageName1");
        imageList.insertBefore(source, imageList.firstChild);


    }
    console.log("inside mcqajax", counter);


    let res = await ajax(userComment, op1, op2, op3, op4, counter, filename);

    // let res = {};
    // res.status = true;
    //const data = await getQues();
    //console.log("data = ");
    //let data1 = (JSON.stringify(data); console.log(JSON.parse(JSON.stringify(data)));
    //let k = 0;
    if (res.status) {
        //we are not goint to use createElement


        // for (k = 0; k < data1.length; k++) {
        const newElement = document
            .querySelector("#referenceCommentId")
            .cloneNode(true);

        newElement.removeAttribute("id"); //good practice to keep unique id.
        newElement.setAttribute('id', `question${counter}`);
        newElement.style.visibility = "visible";
        newElement.children[0].children[0].children[0].children[2].innerHTML = userComment;


        console.log(newElement.children[0].children[0].children[0].children[2])
            //newElement.children[0].children[0].children[0].children[2].children[0].style.visibility = "visible";

        console.log("div = " + newElement.children[0].children[0].children[0].children[2].children);

        newElement.children[0].children[0].children[0].children[4].children[0].children[0].children[0].children[1].innerHTML = op1;
        newElement.children[0].children[0].children[0].children[4].children[0].children[1].children[0].children[1].innerHTML = op2;
        newElement.children[0].children[0].children[0].children[4].children[1].children[0].children[0].children[1].innerHTML = op3;
        newElement.children[0].children[0].children[0].children[4].children[1].children[1].children[0].children[1].innerHTML = op4;
        newElement.children[0].children[0].children[0].children[0].children[0].children[0].children[0].innerHTML = counter;

        newElement.children[0].children[0].children[0].children[0].children[0].children[0].children[0].nextSibling.nextSibling.innerHTML = "(MCQ)";
        console.log(correct_serial);
        if (correct_serial == 1) {
            newElement.children[0].children[0].children[0].children[4].children[0].children[0].children[0].children[0].children[0].style.color = "green";

        } else if (correct_serial == 2) {
            newElement.children[0].children[0].children[0].children[4].children[0].children[1].children[0].children[0].children[0].style.color = "green";
        } else if (correct_serial == 3) {
            newElement.children[0].children[0].children[0].children[4].children[1].children[0].children[0].children[0].children[0].style.color = "green";
        } else {
            newElement.children[0].children[0].children[0].children[4].children[1].children[1].children[0].children[0].children[0].style.color = "green";
        }
        // comment box elment
        const commentBox = document.querySelector("#commentBox");
        // now we want to add the element at the top.
        commentBox.appendChild(newElement);

        // }



        //     //clean the input box
        document.querySelector("#mcqquestion").value = "";
        document.querySelector("#mcqoption1").value = "";
        document.querySelector("#mcqoption2").value = "";
        document.querySelector("#mcqoption3").value = "";
        document.querySelector("#mcqoption4").value = "";
        if(img){
            img.src = "";
            // img.style.visibility = "hidden";
            img.style.display= "none";
        }


        alert("data inserted");
        updatebtn.disabled = false;

    } else {

        alert("data not  inserted");
    }

    $("#mcqModal").modal("hide");
    unticker();
}


async function editPoll(ele) {

    let div = ele.parentNode.parentNode.parentNode.parentNode.childNodes[0].nextSibling.childNodes[0].nextSibling.childNodes[0].nextSibling.childNodes[1];
    console.log(div)
    let question = ele.parentNode.parentNode.parentNode.parentNode.childNodes[2].nextSibling.nextSibling.nextSibling.innerText;
    console.log(div);
    let val = ele.parentNode.parentNode.parentNode.parentNode.childNodes[2].nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling;
    let option1 = val.childNodes[1].childNodes[1].childNodes[1] //.nextSibling.childNodes[0];
    let option2 = val.childNodes[1].childNodes[3].childNodes[0].nextSibling //.childNodes[3].childNodes[0];
    let option3 = val.childNodes[3].childNodes[1].childNodes[0].nextSibling //.childNodes[3].childNodes[0];
    let option4 = val.childNodes[3].childNodes[3].childNodes[0].nextSibling //.childNodes[3].childNodes[0];
    let serial_no = div.innerText;
    // console.log(div.innerText);
    let Qimage = document.getElementById("imgPreviewPoll");
    src = document.getElementById(`question${serial_no}${question}`);
    console.log("src")
    console.log(src);
    Qimage.setAttribute("src", `/assets/img/${src.innerHTML}`);
    console.log(Qimage);
    // Qimage.style.visibility = "visible";
    Qimage.style.display = "block";
    let updatebtn = document.getElementById('pollbutton');

    updatebtn.setAttribute('onclick', `ajaxUpdatePoll(this,${serial_no})`);
    updatebtn.innerText = "Update";

    // console.log(option1.innerText);
    // console.log(option2.childNodes[3].childNodes[0]);
    // console.log(option3.childNodes[3].childNodes[0]);
    // console.log(option4.childNodes[3].childNodes[0]);

    document.querySelector("#questionp").value = question;
    document.querySelector("#option1p").value = option1.innerText;
    document.querySelector("#option2p").value = option2.innerText;
    document.querySelector("#option3p").value = option3.innerText;
    document.querySelector("#option4p").value = option4.innerText; // we are not using innerHTML wy bcz this is a form element
    // let serial_no = document.querySelector("#numinc");

    $('#pollModal').modal('show');
}

async function ajaxUpdatePoll(ele, serial_no) {

    let filename;
    var img = document.getElementById('imgPreview');
    var mcqImage = document.getElementById('Qimg');
    if (img === undefined) {
        img = null;
    } else {
        console.log(img);

        img = img.src;
        console.log(img);
        filename = img.split('/');
        filename = filename[filename.length - 1];
        console.log(filename);
        // mcqImage.style.visibility = 'visible';
        // mcqImage.src = img;
    }
    let newElement = document.getElementById(`question${serial_no}`);
    console.log(newElement);
    let question = document.querySelector("#questionp").value;
    let op1 = document.querySelector("#option1p").value;
    let op2 = document.querySelector("#option2p").value;
    let op3 = document.querySelector("#option3p").value;
    let op4 = document.querySelector("#option4p").value; // we are not using innerHTML wy bcz this is a form element

    let timer = document.getElementById('timer').value
    let max_points = document.getElementById('maxpoint').value
    let correct_serial = document.getElementById('correct_option').value
    let difficulty = document.getElementById('difficulty').value;
    let options = [
        { "statement": op1, "serial_no": 1 },
        { "statement": op2, "serial_no": 2 },
        { "statement": op3, "serial_no": 3 },
        { "statement": op4, "serial_no": 4 }
    ]

    let data = {
        "question_statement": question,
        "question_type": "Polling",
        "serial_no": serial_no,
        "difficulty": difficulty,
        "question_timer": timer,
        "max_points": max_points,
        "options": options,
        "correct_serial": correct_serial,

    }
    try {
        const resp = await fetch('/api/v1/editquestion', {
            method: "POST",
            headers: {
                "Content-Type": "Application/Json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(data)
        }).then(() => {
            window.alert("Data updated successfuly");
            newElement.children[0].children[0].children[0].children[2].innerHTML = question;
            newElement.children[0].children[0].children[0].children[4].children[0].children[0].children[0].children[1].innerHTML = op1;
            newElement.children[0].children[0].children[0].children[4].children[0].children[1].children[0].children[1].innerHTML = op2;
            newElement.children[0].children[0].children[0].children[4].children[1].children[0].children[0].children[1].innerHTML = op3;
            newElement.children[0].children[0].children[0].children[4].children[1].children[1].children[0].children[1].innerHTML = op4;
            newElement.children[0].children[0].children[0].children[0].children[0].children[0].children[0].innerHTML = serial_no;

        }).catch(() => {
            window.alert("Data Updation failed");
        });
        let updatebtn = document.getElementById('pollbutton');
        updatebtn.setAttribute('onclick', 'pollajax()');
        updatebtn.innerText = "Save";
        var img = document.getElementById('imgPreviewPoll');
        img.src = "";
        // img.style.visibility = "hidden";
        img.style.display = "none";
        $("pollModal").modal("hide");


    } catch (err) {
        console.log(err);
    }

    document.querySelector("#questionp").value = "";
    document.querySelector("#option1p").value = "";
    document.querySelector("#option2p").value = "";
    document.querySelector("#option3p").value = "";
    document.querySelector("#option4p").value = "";

    $('#pollModal').modal('hide');
}

function callMcqModal() {
    $('#mcqModal').modal('show');
}

function callPollModal() {
    $('#pollModal').modal("show");
}

function callFillModal() {
    $('#fillModal').modal('show');
}
async function pollajax() {

    let filename;
    var img = document.getElementById('imgPreview');
    var mcqImage = document.getElementById('Qimg');
    if (img === undefined) {
        img = null;
    } else {
        console.log(img);

        img = img.src;
        console.log(img);
        filename = img.split('/');
        filename = filename[filename.length - 1];
        console.log(filename);
        // mcqImage.style.visibility = 'visible';
        // mcqImage.src = img;
    }
    let userComment = document.querySelector("#questionp").value;
    console.log("hiiiiiii pollllllllllll");
    let op1 = document.querySelector("#option1p").value;
    let op2 = document.querySelector("#option2p").value;
    let op3 = document.querySelector("#option3p").value;
    let op4 = document.querySelector("#option4p").value; // we are not using innerHTML wy bcz this is a form element
    let num = document.querySelector("#numinc");
    counter = counter + 1;
    // document.querySelector("#type").innerHTML = "(Poll)";
    let resp = await ajax_poll(userComment, op1, op2, op3, op4, counter);
    // let resp = {};
    // resp.status = true;
    if (resp.status) {
        //  we are not goint to use createElement
        const newElement = document
            .querySelector("#referencepollId")
            .cloneNode(true);

        newElement.removeAttribute("id"); //good practice to keep unique id
        newElement.setAttribute('id', `question${counter}`);
        newElement.style.visibility = "visible";
        newElement.children[0].children[0].children[0].children[2].innerHTML = userComment;
        newElement.children[0].children[0].children[0].children[4].children[0].children[0].children[0].children[1].innerHTML = op1;
        newElement.children[0].children[0].children[0].children[4].children[0].children[1].children[0].children[1].innerHTML = op2;
        newElement.children[0].children[0].children[0].children[4].children[1].children[0].children[0].children[1].innerHTML = op3;
        newElement.children[0].children[0].children[0].children[4].children[1].children[1].children[0].children[1].innerHTML = op4;
        newElement.children[0].children[0].children[0].children[0].children[0].children[0].children[0].innerHTML = counter;
        newElement.children[0].children[0].children[0].children[0].children[0].children[0].children[0].nextSibling.nextSibling.innerHTML = "(POLL)";
        // comment box elment
        const commentBox = document.querySelector("#commentBox");

        // now we want to add the element at the top.
        commentBox.appendChild(newElement);

        newElement.children[0].children[0].children[0].children[4].children[0].children[0].children[0].children[0].children[0].style.color = "orange";


        newElement.children[0].children[0].children[0].children[4].children[0].children[1].children[0].children[0].children[0].style.color = "orange";

        newElement.children[0].children[0].children[0].children[4].children[1].children[0].children[0].children[0].children[0].style.color = "orange";

        newElement.children[0].children[0].children[0].children[4].children[1].children[1].children[0].children[0].children[0].style.color = "orange";
        //commentBox.insertBefore(newElement, commentBox.firstChild);

        // clean the input box
        let pollbtn = document.getElementById("editbtnpoll");
        pollbtn.setAttribute('onclick', 'editPoll(this)');
        document.querySelector("#questionp").value = "";
        document.querySelector("#option1p").value = "";
        document.querySelector("#option2p").value = "";
        document.querySelector("#option3p").value = "";
        document.querySelector("#option4p").value = "";
        alert("data inserted");
        //await unticker();
    } else {
        //  wait unticker();
        alert("data not inserted");
    }
}

async function fillajax() {

    let filename;
    let image;
    var img = document.getElementById('imgPreviewFill');
    // var mcqImage = document.getElementById('Qimg');
    if (img === undefined) {
        img = null;
    } else {
        console.log(img);

        let src = img.src;
        console.log("  src of image in fill ="+src);
         image = document.getElementById('image1').cloneNode(true);
        image.removeAttribute('id');

        image.innerHTML = src;
        console.log("image = "+image+" src= = "+src);

        filename = src.split('/');
        filename = filename[filename.length - 1];
        console.log(filename);
        // mcqImage.style.visibility = 'visible';
        // mcqImage.src = img;
    }
    let userComment = document.querySelector("#questionf").value;
    let op1 = document.querySelector("#option1f").value;
    console.log(userComment);
    console.log(document.querySelector("#option1f").value);
    // let op2 = document.querySelector("#option2f").value;
    // let op3 = document.querySelector("#option3f").value;
    // let op4 = document.querySelector("#option4f").value; // we are not using innerHTML wy bcz this is a form element

    counter = counter + 1;
    image.setAttribute('id', `question${counter}${userComment}`);
    console.log(image);
    let imageList = document.getElementById("imageName1");
    imageList.insertBefore(image, imageList.firstChild);
    //document.querySelector("#type").innerHTML = "(fill in blanks)";
    let resp = await ajax_fill(userComment, op1, counter, filename);
    if (resp.status) {
        //  we are not goint to use createElement
        const newElement = document.getElementById("referencefillId").cloneNode(true);
        console.log(newElement);
        newElement.removeAttribute("id");
        newElement.setAttribute('id', `question${counter}`);
        //good practice to keep unique id.
        newElement.style.visibility = "visible";
        newElement.children[0].children[0].children[0].children[2].innerHTML = userComment;
        newElement.children[0].children[0].children[0].children[4].children[0].children[0].children[0].children[1].innerHTML = op1;
        // newElement.children[0].children[0].children[0].children[4].children[0].children[1].children[0].children[1].innerHTML = op2;
        // newElement.children[0].children[0].children[0].children[4].children[1].children[0].children[0].children[1].innerHTML = op3;
        // newElement.children[0].children[0].children[0].children[4].children[1].children[1].children[0].children[1].innerHTML = op4;
        newElement.children[0].children[0].children[0].children[0].children[0].children[0].children[0].innerHTML = counter;
        newElement.children[0].children[0].children[0].children[0].children[0].children[0].children[0].nextSibling.nextSibling.innerHTML = "(fill in blanks)";

        //green all answers are correct
        newElement.children[0].children[0].children[0].children[4].children[0].children[0].children[0].children[0].children[0].style.color = "green";
        // newElement.children[0].children[0].children[0].children[4].children[0].children[1].children[0].children[0].children[0].style.color = "green";
        // newElement.children[0].children[0].children[0].children[4].children[1].children[0].children[0].children[0].children[0].style.color = "green";
        // newElement.children[0].children[0].children[0].children[4].children[1].children[1].children[0].children[0].children[0].style.color = "green";

        // comment box elment
        const commentBox = document.querySelector("#commentBox");
        // now we want to add the element at the top.
        commentBox.appendChild(newElement);
        //commentBox.insertBefore(newElement, commentBox.firstChild);
        // clean the input box
        document.querySelector("#questionf").value = "";
        document.querySelector("#option1f").value = "";
        img.src = '';
        // img.style.visibility = "hidden";
        img.style.display = "none";
        // document.querySelector("#option2f").value = "";
        // document.querySelector("#option3f").value = "";
        // document.querySelector("#option4f").value = "";
        alert("data insert");
        await unticker();
    } else {
        await unticker();
        alert("data not inserted");
    }
    $("#fillModal").modal("hide");
}

/* all ajax calls are here
1.ajax()=mcq
2.ajax_fill()=fill
3.ajax_poll()=poll
*/

async function ajax(question, option1, option2, option3, option4, counter, img) {
    console.log("inside ajax", counter);
    let timer = document.getElementById('timer').value
    let max_points = document.getElementById('maxpoint').value
    let correct_serial = document.getElementById('correct_option').value
    let difficulty = document.getElementById('difficulty').value;

    let options = [
        { "statement": option1, "serial_no": 1 },
        { "statement": option2, "serial_no": 2 },
        { "statement": option3, "serial_no": 3 },
        { "statement": option4, "serial_no": 4 }
    ]

    let data = {
        "question_statement": question,
        "question_type": 'MCQ',
        "serial_no": counter,
        "difficulty": difficulty,
        "question_timer": timer,
        "max_points": max_points,
        "options": options,
        "correct_serial": correct_serial,
        "question_image": img,

    }
    try {
        const resp = await fetch('/api/v1/addQuestion', {
            method: "POST",
            headers: {
                "Content-Type": "Application/Json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(data)
        });
        return resp;
    } catch (err) {
        console.log(err);
    }
    let updatebtn = document.getElementById('mcqbutton');
    updatebtn.disabled = false;
    $("mcqModal").modal("hide");
}

async function ajax_fill(question, option1, counter, filename) {
    let timer = document.getElementById('timer_fill').value
    let max_points = document.getElementById('maxpoint_fill').value
    let correct_serial = 0;
    let difficulty = document.getElementById('difficulty_fill').value;
    let options = [
        { "statement": option1, "serial_no": 1 }
        // { "statement": option2, "serial_no": 2 },
        // { "statement": option3, "serial_no": 3 },
        // { "statement": option4, "serial_no": 4 }
    ]

    let data = {
        "question_statement": question,
        "question_type": "Fillup",
        "serial_no": counter,
        "difficulty": difficulty,
        "question_timer": timer,
        "max_points": max_points,
        "options": options,
        "correct_serial": correct_serial,
        "question_image": filename

    }
    try {
        const resp = await fetch('/api/v1/addQuestion', {
            method: "POST",
            headers: {
                "Content-Type": "Application/Json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(data)

        });
        return resp;
    } catch (err) {
        console.log(err);
    }
    unticker();
    $("fillModal").modal("hide");
}

async function ajax_poll(question, option1, option2, option3, option4, counter) {
    console.log("in console loggggggggggggggggggg");
    let timer = document.getElementById('timer_poll').value;
    console.log("timer_poll" + timer);
    let max_points = document.getElementById('maxpoint_poll').value;
    let correct_serial = 0;
    let difficulty = document.getElementById('difficulty_poll').value;
    let options = [
        { "statement": option1, "serial_no": 1 },
        { "statement": option2, "serial_no": 2 },
        { "statement": option3, "serial_no": 3 },
        { "statement": option4, "serial_no": 4 },
    ];

    let data = {
        "question_statement": question,
        "question_type": "Polling",
        "serial_no": counter,
        "difficulty": difficulty,
        "question_timer": timer,
        "max_points": max_points,
        "options": options,
        "correct_serial": correct_serial,
    };
    try {
        const resp = await fetch('/api/v1/addQuestion', {
            method: "POST",
            headers: {
                "Content-Type": "Application/Json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(data)
        });
        return resp;
    } catch (error) {
        console.log(error);
    }
}

async function unticker() {

    document.getElementById("tick1").style.color = "grey";
    document.getElementById("tick2").style.color = "grey";
    document.getElementById("tick3").style.color = "grey";
    document.getElementById("tick4").style.color = "grey";


    document.getElementById("correct_option").setAttribute("value", 0);
}


function cancel() {
    let updatebtn = document.getElementById('mcqbutton');
    updatebtn.setAttribute('onclick', 'mcqajax()');
    updatebtn.innerText = "Save";
    let updatebtn1 = document.getElementById('fillbutton');
    updatebtn1.setAttribute('onclick', 'fillajax()');
    updatebtn1.innerText = "Save";
    let updatebtn2 = document.getElementById('pollbutton');
    updatebtn2.setAttribute('onclick', 'pollajax()');
    updatebtn2.innerText = "Save";
    console.log("cancel");
    var img = document.getElementById('imgPreview');
    img.src = "";
    img.style.display = "none";
    var img1 = document.getElementById('imgPreviewFill');
    img1.src = "";
    img1.style.display = "none";
    var img2 = document.getElementById('imgPreviewPoll');
    img2.src = "";
    img2.style.display = "none";
    document.querySelector("#questionp").value = "";
    document.querySelector("#option1p").value = "";
    document.querySelector("#option2p").value = "";
    document.querySelector("#option3p").value = "";
    document.querySelector("#option4p").value = "";
    document.querySelector("#mcqquestion").value = "";
    document.querySelector("#mcqoption1").value = "";
    document.querySelector("#mcqoption2").value = "";
    document.querySelector("#mcqoption3").value = "";
    document.querySelector("#mcqoption4").value = "";
    document.querySelector("#questionf").value = "";
    document.querySelector("#option1f").value = "";
    $('#fillModal').modal('hide');
    $('#mcqModal').modal('hide');
    $('#pollModal').modal("hide");
}



async function deleteQ(ele) {
    console.log("hiiiii");
    var srno = document.getElementById("questionName");
    //console.log(srno.children[0].innerText);
    let srNo = srno.children[0].innerText;
    console.log("srNo =" + srNo);

    try {
        await fetch('/api/v1/deletequestion?srno=' + srNo, {
            method: "GET",
            headers: {
                "Content-Type": "Application/Json",
                "Access-Control-Allow-Origin": "*",
            },

        });
    } catch (error) {
        console.log(error);
    }

    //console.log(ele.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode);

    let div = ele.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    let foo = div.parentNode;
    //console.log(foo);
    //div.style = "display : none";

    div.remove();
    // console.log(child.firstChild.nextSibling.firstChild.nextSibling.childNodes[1].childNodes[1].childNodes[1]);
    // console.log(c1.innerHTML);
    let i = 0;
    let id = srNo;
    for (i = 0; i < foo.children.length; i++) {
        console.log(foo.children[i]);
        let child = foo.children[i];
        child.removeAttribute('id');
        let c1 = child.firstChild.nextSibling.firstChild.nextSibling.childNodes[1].childNodes[1].childNodes[1].childNodes[1].childNodes[1];
        if (foo.children.length === 1) {
            child.setAttribute('id', `question${id}`);
            c1.innerHTML = srNo;
            break;
        }

        child.setAttribute('id', `question${id++}`);

        //console.log(child.firstChild.nextSibling.firstChild.nextSibling);
        // let type = c1.nextSibling.nextSibling;

        c1.innerHTML = srNo++;

        console.log(c1.innerText);

    }
    counter = i;
}

async function editQ(ele) {

    //ele.attributes(data - toggle, "modal");
    // let mod = document.getElementById("mcqModal");
    let correct_serial = document.getElementById('correct_option').value;
    let div2 = ele.parentNode.parentNode.parentNode.parentNode.childNodes[0].nextSibling.childNodes[0].nextSibling.childNodes[0].nextSibling.childNodes[1];
    //console.log(div2);
    let serial_no = div2.innerText;
    let src;

    let Qimage = document.getElementById("imgPreview");

    //console.log(mod);
    let div = ele.parentNode.parentNode.parentNode.parentNode.childNodes[2].nextSibling.nextSibling.nextSibling.innerText;
    console.log(div);
    let val = ele.parentNode.parentNode.parentNode.parentNode.childNodes[2].nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling;
    let option1 = val.childNodes[1].childNodes[1].childNodes[1] //.nextSibling.childNodes[0];
    let option2 = val.childNodes[1].childNodes[3].childNodes[0].nextSibling //.childNodes[3].childNodes[0];
    let option3 = val.childNodes[3].childNodes[1].childNodes[0].nextSibling //.childNodes[3].childNodes[0];
    let option4 = val.childNodes[3].childNodes[3].childNodes[0].nextSibling //.childNodes[3].childNodes[0];
    src = document.getElementById(`question${serial_no}${div}`);
    console.log(`question${serial_no}${div}`);
    console.log("src")
    console.log(src);

    if(src != null){
        Qimage.setAttribute("src", `/assets/img/${src.innerHTML}`);
        console.log(Qimage);
        Qimage.style.display = "block";
    }

    let option1Style = option1.childNodes[0].nextSibling.childNodes[1] //.style.color;
    let option2Style = option2.childNodes[0].nextSibling.childNodes[1] //.style.color;
    let option3Style = option3.childNodes[0].nextSibling.childNodes[1] //.style.color;
    let option4Style = option4.childNodes[0].nextSibling.childNodes[1] //.style.color;

    // console.log(div.innerText);


    console.log(option1Style);
    console.log(option2Style);
    console.log(option3Style);
    console.log(option4Style);
    let q = document.getElementById("mcqquestion");
    q.value = div;
    //q.setAttribute('value', div);
    let op1 = document.querySelector("#mcqoption1");
    op1.value = option1.innerText;

    let op2 = document.querySelector("#mcqoption2");
    op2.value = option2.innerText;
    let op3 = document.querySelector("#mcqoption3");
    op3.value = option3.innerText;
    let op4 = document.querySelector("#mcqoption4");
    op4.value = option4.innerText;

    let updatebtn = document.getElementById('mcqbutton');

    updatebtn.setAttribute('onclick', `mcqUpdate(${serial_no})`);
    updatebtn.innerText = "Update";

    if (option1Style.style.color == 'green') {
        document.getElementById('tick1').style.color = "green";

    } else if (option2Style.style.color == 'green') {
        document.getElementById('tick2').style.color = "green";

    } else if (option3Style.style.color == 'green') {
        document.getElementById('tick3').style.color = "green";
    } else {
        document.getElementById('tick4').style.color = "green";
    }
    document.querySelector("#questionp").value = "";
    document.querySelector("#option1p").value = "";
    document.querySelector("#option2p").value = "";
    document.querySelector("#option3p").value = "";
    document.querySelector("#option4p").value = "";
    $('#mcqModal').modal('show');

}

async function editFillQ(ele) {

    let div = ele.parentNode.parentNode.parentNode.parentNode.childNodes[0].nextSibling.childNodes[0].nextSibling.childNodes[0].nextSibling.childNodes[1];

    let serial_no = div.innerText;
    console.log("in editQ");
    let updatebtn = document.getElementById('fillbutton');
    let Qimage = document.getElementById("imgPreviewFill");

    updatebtn.setAttribute('onclick', `ajaxUpdatefill(this,${serial_no})`);
    updatebtn.innerText = "Update";
    document.querySelector("#questionf").value = ele.parentNode.parentNode.parentNode.parentNode.childNodes[2].nextSibling.nextSibling.nextSibling.innerText;
    let question = ele.parentNode.parentNode.parentNode.parentNode.childNodes[2].nextSibling.nextSibling.nextSibling.innerText;
    let option = ele.parentNode.parentNode.parentNode.parentNode.childNodes[4].nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.childNodes[1].innerText;
    document.querySelector("#option1f").value = option;
    console.log(option);
    document.getElementById('timer').value;
    document.getElementById('maxpoint').value;
    document.getElementById('correct_option').value;
    document.getElementById('difficulty').value;
    let src = document.getElementById(`question${serial_no}${question}`);
    console.log(`image source question${serial_no}${question}`);
    console.log("src")
    console.log(src);
    if(src != null){
        Qimage.setAttribute("src", `${src.innerHTML}`);
        console.log(Qimage);
        Qimage.style.display = "block";
    }

    // let op1 = document.querySelector("#option1f").value;
    // let op2 = document.querySelector("#option2f").value;
    // let op3 = document.querySelector("#option3f").value;
    // let op4 = document.querySelector("#option4f").value; // we are not using innerHTML wy bcz this is a form element

    // let resp = await ajax_fill(userComment, op1, counter);

    // document.querySelector("#questionf").value = "";
    // document.querySelector("#option1f").value = "";
    // document.querySelector("#option3f").value = "";
    // document.querySelector("#option4f").value = "";

    $('#fillModal').modal('show');
}



async function mcqUpdate(serial_no) {
    //let type = ele.parentNode.parentNode.parentNode.parentNode.childNodes[0].nextSibling.childNodes[0].nextSibling.childNodes[1].childNodes[3];
    //console.log(type);
    //let typediv = document.getElementById('type'); //ele.parentNode.parentNode.parentNode.parentNode.childNodes[0].nextSibling.childNodes[0].nextSibling;
    //console.log(div);
    //let Qtype = typediv.innerText; // for question type
    let filename;
    let correct_serial = document.getElementById('correct_option').value;
    console.log("corret_serail in update= "+correct_serial);
    var img = document.getElementById('imgPreview');

    if (img === undefined) {
        img = null;
    } else {
        console.log(img);

        img = img.src;
        console.log(img);
        filename = img.split('/');
        filename = filename[filename.length - 1];
        console.log(filename);
        // mcqImage.style.visibility = 'visible';
        // mcqImage.src = img;
    }
    let userComment = document.querySelector("#mcqquestion").value;
    let op1 = document.querySelector("#mcqoption1").value;
    let op2 = document.querySelector("#mcqoption2").value;
    let op3 = document.querySelector("#mcqoption3").value;
    let op4 = document.querySelector("#mcqoption4").value; // we are not using innerHTML wy bcz this is a form element

    // div = document.querySelector("#numinc");
    // let serial_no = div.innerText;
    let newElement = document.getElementById(`question${serial_no}`);
    console.log("serial_no = " + serial_no);
    console.log("inside mcqajax", counter);
    document.querySelector("#type").innerHTML = "(MCQ)";
    let res = await ajaxUpdate(userComment, op1, op2, op3, op4, serial_no);
    if (res) {
        newElement.children[0].children[0].children[0].children[2].innerHTML = userComment;
        newElement.children[0].children[0].children[0].children[4].children[0].children[0].children[0].children[1].innerHTML = op1;
        newElement.children[0].children[0].children[0].children[4].children[0].children[1].children[0].children[1].innerHTML = op2;
        newElement.children[0].children[0].children[0].children[4].children[1].children[0].children[0].children[1].innerHTML = op3;
        newElement.children[0].children[0].children[0].children[4].children[1].children[1].children[0].children[1].innerHTML = op4;
        newElement.children[0].children[0].children[0].children[0].children[0].children[0].children[0].innerHTML = serial_no;

        if (correct_serial == 1) {
            newElement.children[0].children[0].children[0].children[4].children[0].children[0].children[0].children[0].children[0].style.color = "green";
            newElement.children[0].children[0].children[0].children[4].children[0].children[1].children[0].children[0].children[0].style.color = "red";
            newElement.children[0].children[0].children[0].children[4].children[1].children[0].children[0].children[0].children[0].style.color = "red";
            newElement.children[0].children[0].children[0].children[4].children[1].children[1].children[0].children[0].children[0].style.color = "red";

        } else if (correct_serial == 2) {
            newElement.children[0].children[0].children[0].children[4].children[0].children[0].children[0].children[0].children[0].style.color = "red";
            newElement.children[0].children[0].children[0].children[4].children[0].children[1].children[0].children[0].children[0].style.color = "green";
            newElement.children[0].children[0].children[0].children[4].children[1].children[0].children[0].children[0].children[0].style.color = "red";
            newElement.children[0].children[0].children[0].children[4].children[1].children[1].children[0].children[0].children[0].style.color = "red";
        } else if (correct_serial == 3) {
            newElement.children[0].children[0].children[0].children[4].children[0].children[0].children[0].children[0].children[0].style.color = "red";
            newElement.children[0].children[0].children[0].children[4].children[0].children[1].children[0].children[0].children[0].style.color = "red";
            newElement.children[0].children[0].children[0].children[4].children[1].children[0].children[0].children[0].children[0].style.color = "green";
            newElement.children[0].children[0].children[0].children[4].children[1].children[1].children[0].children[0].children[0].style.color = "red";
        } else {
            newElement.children[0].children[0].children[0].children[4].children[0].children[0].children[0].children[0].children[0].style.color = "red";
            newElement.children[0].children[0].children[0].children[4].children[0].children[1].children[0].children[0].children[0].style.color = "red";
            newElement.children[0].children[0].children[0].children[4].children[1].children[0].children[0].children[0].children[0].style.color = "red";
            newElement.children[0].children[0].children[0].children[4].children[1].children[1].children[0].children[0].children[0].style.color = "green";
        }
        window.alert("data updated Successfuly");

    } else {
        window.alert("data updated failed");
    }
    let updatebtn = document.getElementById('mcqbutton');
    updatebtn.setAttribute('onclick', 'mcqajax()');
    updatebtn.innerText = "Save";
    var img = document.getElementById('imgPreview');
    img.src = "";
    img.style.display = "none";
    unticker();
    $('#mcqModal').modal('hide');

}

async function ajaxUpdatefill(ele, serial_no) {

    let filename;
    var img = document.getElementById('imgPreview');

    if (img === undefined) {
        img = null;
    } else {
        console.log(img);

        img = img.src;
        console.log(img);
        filename = img.split('/');
        filename = filename[filename.length - 1];
        console.log(filename);
        // mcqImage.style.visibility = 'visible';
        // mcqImage.src = img;
    }

    console.log("srno = " + serial_no);

    question = document.querySelector("#questionf").value;
    let newElement = document.getElementById(`question${serial_no}`);
    option1 = document.querySelector("#option1f").value;
    let timer = document.getElementById('timer_fill').value
    let max_points = document.getElementById('maxpoint_fill').value
    let correct_serial = 0;
    let difficulty = document.getElementById('difficulty_fill').value;
    let options = [
        { "statement": option1, "serial_no": 1 }
        // { "statement": option2, "serial_no": 2 },
        // { "statement": option3, "serial_no": 3 },
        // { "statement": option4, "serial_no": 4 }
    ]

    let data = {
        "question_statement": question,
        "question_type": "Fillup",
        "serial_no": serial_no,
        "difficulty": difficulty,
        "question_timer": timer,
        "max_points": max_points,
        "options": options,
        "correct_serial": correct_serial,

    }

    const resp = await fetch('/api/v1/editquestion', {
        method: "POST",
        headers: {
            "Content-Type": "Application/Json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(data)

    }).then(() => {
        window.alert("Data Updated successfully");

    }).catch(() => {
        window.alert("Data Updation Failed");
    });

    newElement.children[0].children[0].children[0].children[2].innerHTML = question;
    newElement.children[0].children[0].children[0].children[4].children[0].children[0].children[0].children[1].innerHTML = option1;


    unticker();
    let updatebtn = document.getElementById('fillbutton');

    updatebtn.setAttribute('onclick', 'fillajax()');
    updatebtn.innerText = "Save";
    document.querySelector("#questionf").value = "";
    document.querySelector("#option1f").value = "";
    var img = document.getElementById('imgPreviewFill');
    img.src = "";
    img.style.display = "none";
    $("#fillModal").modal("hide");
}


async function ajaxUpdate(question, op1, op2, op3, op4, serial_no) {

    let filename;
    var img = document.getElementById('imgPreview');

    if (img === undefined) {
        img = null;
    } else {
        console.log(img);

        img = img.src;
        console.log(img);
        filename = img.split('/');
        filename = filename[filename.length - 1];
        console.log(filename);

    }
    let newElement = document.getElementById(`question${serial_no}`);
    console.log(newElement);
    // console.log("inside ajax", div);
    let timer = document.getElementById('timer').value
    let max_points = document.getElementById('maxpoint').value
    let correct_serial = document.getElementById('correct_option').value
    let difficulty = document.getElementById('difficulty').value;

    let options = [
        { "statement": op1, "serial_no": 1 },
        { "statement": op2, "serial_no": 2 },
        { "statement": op3, "serial_no": 3 },
        { "statement": op4, "serial_no": 4 }
    ]

    let data = {
        "question_statement": question,
        "question_type": "MCQ",
        "serial_no": serial_no,
        "difficulty": difficulty,
        "question_timer": timer,
        "max_points": max_points,
        "options": options,
        "correct_serial": correct_serial,

    }
    try {
        const resp = await fetch('/api/v1/editquestion', {
            method: "POST",
            headers: {
                "Content-Type": "Application/Json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(data)
        });
        let updatebtn = document.getElementById('mcqbutton');
        updatebtn.setAttribute('onclick', 'mcqajax()');
        updatebtn.innerText = "Save";
        $("#mcqModal").modal("hide");
        unticker();
        return true;
    } catch (err) {
        console.log(err);
        unticker();
        return false;
    }
}