function skillsMember() {
    var skills = document.getElementsByClassName('skills');
    var skill = document.getElementsByClassName('skill');
    var skillHeight = 0;
    for (var i = 0; i < skills.length; i++) {
        for (var j = 0; j < skill.length; j++) {
            if (skill[j].offsetHeight > skillHeight) {
                skillHeight = skill[j].offsetHeight;
            }
        }
        skills[i].style.height = skillHeight + 'px';
        skillHeight = 0;
    }
}