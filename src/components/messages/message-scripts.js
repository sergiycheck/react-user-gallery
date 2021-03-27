
export default function activateMessageHandlers(){

	clickSideBarToggler();
	//addMessage();
}

function clickSideBarToggler(){
	const sidebar = document.querySelector(".sidebar");
	document.getElementById("sidebarCollapse").addEventListener('click',()=>{
		sidebar.classList.toggle("active")
	});
}

function addMessage(){
	const sendMsgBtn = document.getElementById("send-message-btn");

	sendMsgBtn.addEventListener('click',()=>{
		const mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May',
	 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

		const messageContainer = document.querySelector(".chat-message-container");
		const msgDataMessage = document.getElementById("message-data");
		const inputMessage = msgDataMessage.innerText;
		msgDataMessage.innerText ="";

		let messageWrapper = createElement({tagName:"div",className:"my-2 me-3 align-self-end"});
		let messageRound = createElement({tagName:"div",className:"rounded d-flex mb-1"});
		let bglight = createElement({tagName:"div",className:"bg-light"});
		let msgControls = createElement({tagName:"div",className:"d-flex justify-content-end"});
		let edit = createElement({tagName:"small",className:"text-muted me-2 edit-msg"});
		edit.innerText = "Edit"
		let deleteBtn = createElement({
			tagName:"button",
			className:"btn-close",
			attributes:{
				"data-bs-dismiss":"toast",
				"aria-label":"Close"
			}
		});
		let pdiv = createElement({tagName:"div",className:"p-2"});
		let txtData = createElement({
			tagName:"p",
			className:"text-small mb-0 text-white bg-primary p-2 rounded"});
		txtData.innerText = inputMessage;

		let pDate = createElement({tagName:"p",className:"small text-muted"});
		let time = new Date();
		let hoursAndMinutes = time.toLocaleString('en-US', {
			hour: 'numeric', minute: 'numeric', hour12: true });
		let monthNum = time.getMonth();
		pDate.innerText = `${hoursAndMinutes} | ${mS[monthNum-1]}. ${monthNum}`;

		pdiv.appendChild(txtData);
		msgControls.appendChild(edit);
		msgControls.appendChild(deleteBtn);

		bglight.appendChild(msgControls);
		bglight.appendChild(pdiv);



		messageRound.appendChild(bglight);
		messageWrapper.appendChild(messageRound);
		messageWrapper.appendChild(pDate);
		//messageContainer.insertBefore(messageWrapper,messageContainer.lastChild);
		messageContainer.appendChild(messageWrapper);


	},false)

}

function createElement({ tagName, className, attributes = {} }) {
	const element = document.createElement(tagName);

	if (className) {
			const classNames = className.split(' ').filter(Boolean);
			element.classList.add(...classNames);
	}

	Object.keys(attributes).forEach((key) =>
			element.setAttribute(key, attributes[key]));

	return element;
}

