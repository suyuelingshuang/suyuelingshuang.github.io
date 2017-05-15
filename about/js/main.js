/**
 * Created by ZWX on 2017/5/14.
 */

/********************************* main *****************************/
/************************ 教育经历 **********************/
/**************** 添加教育经历 ****************/
function addEdu() {
    var main = document.getElementById('main');
    var edu = getElementsByClassName(main,'edu')[0];
    var add = getElementsByClassName(edu,'add')[0];
    add.onclick = function () {
        if(edu.getElementsByTagName('div').length)return;
        var container = document.createElement('div');

        var eduForm = document.createElement('form');
        eduForm.action = "edu_action_page.php";
        var sch = document.createElement('select');
        sch.name = 'school';

        var op1 = document.createElement('option');
        op1.value = 'xd';
        op1.checked = true;
        var text1 = document.createTextNode('西安电子科技大学');
        op1.appendChild(text1);
        var op2 = document.createElement('option');
        op2.value = 'xgd';
        var text2 = document.createTextNode('西北工业大学');
        op2.appendChild(text2);
        var op3 = document.createElement('option');
        op3.value = 'xjd';
        var text3 = document.createTextNode('西安交通大学');
        op3.appendChild(text3);
        sch.appendChild(op1);
        sch.appendChild(op2);
        sch.appendChild(op3);

        var maj = document.createElement('input');
        maj.type = 'text';
        maj.value = '电子与通信工程';
        var dip = document.createElement('input');
        dip.type = 'text';
        dip.value = '硕士研究生';
        var t = document.createElement('input');
        t.type = 'text';
        t.value = '2015.9 - 2018.7';
        var btn = document.createElement('input');
        btn.type = 'submit';
        btn.className = 'btn';
        btn.value = '保存';

        eduForm.appendChild(sch);
        eduForm.appendChild(maj);
        eduForm.appendChild(dip);
        eduForm.appendChild(t);
        eduForm.appendChild(btn);
        container.appendChild(eduForm);
        edu.appendChild(container);
    }
}

/**************** 保存教育经历 ****************/
function saveEdu() {
    var main = document.getElementById('main');
    var edu = getElementsByClassName(main,'edu')[0];
    var eduForm = edu.getElementsByTagName('form')[0];
    var eduSelect = eduForm.getElementsByTagName('select')[0];
    var inp = eduForm.getElementsByTagName('input')
    var btn = getElementsByClassName(eduForm,'btn')[0];
    btn.onclick = function () {
        
    }
}




addLoadEvent(addEdu);


/*********************************/
