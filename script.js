document.addEventListener('DOMContentLoaded', function() {
    // 获取URL参数
    const urlParams = new URLSearchParams(window.location.search);
    const viewMode = urlParams.get('view');
    
    // 如果是查看模式，隐藏编辑面板
    if (viewMode === 'share') {
        document.getElementById('editPanel').style.display = 'none';
        // 从LocalStorage加载数据
        loadCardData();
    }

    // 保存按钮事件
    document.getElementById('saveBtn').addEventListener('click', function() {
        saveCardData();
        alert('保存成功！');
    });

    // 分享按钮事件
    document.getElementById('shareBtn').addEventListener('click', function() {
        const baseUrl = 'https://laosuning.github.io/business-card/';
        const shareUrl = baseUrl + '?view=share';
        // 复制链接到剪贴板
        navigator.clipboard.writeText(shareUrl).then(function() {
            alert('分享链接已复制到剪贴板！');
        });
    });

    // 实时预览
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            document.getElementById(this.id.replace('Input', 'Display')).textContent = this.value;
        });
    });
});

// 保存数据
function saveCardData() {
    const data = {
        name: document.getElementById('nameInput').value,
        title: document.getElementById('titleInput').value,
        company: document.getElementById('companyInput').value,
        address: document.getElementById('addressInput').value,
        tel: document.getElementById('telInput').value,
        mobile: document.getElementById('mobileInput').value,
        email: document.getElementById('emailInput').value
    };
    localStorage.setItem('cardData', JSON.stringify(data));
}

// 加载数据
function loadCardData() {
    const data = JSON.parse(localStorage.getItem('cardData'));
    if (data) {
        document.getElementById('nameDisplay').textContent = data.name;
        document.getElementById('titleDisplay').textContent = data.title;
        document.getElementById('companyDisplay').textContent = data.company;
        document.getElementById('addressDisplay').textContent = data.address;
        document.getElementById('telDisplay').textContent = data.tel;
        document.getElementById('mobileDisplay').textContent = data.mobile;
        document.getElementById('emailDisplay').textContent = data.email;
    }
}