function refresh(history, cn) {
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    const wait = async event => {
        await sleep(1);
    };

    async function refresh() {
        let current = history.location.pathname.toString();
        history.push(cn.path.root);
        await wait();
        history.push(current);
    }

    refresh();
}

export default refresh