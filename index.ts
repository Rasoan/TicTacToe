{
    const testElement = document.createElement('div');
    testElement.setAttribute('id', 'testElement');
    testElement.innerText = 'Hello World)';

    const root = document.getElementById('root');

    if (root) {
        root.appendChild(testElement);
    }
    else {
        console.error('Root node is not defined');
    }
}