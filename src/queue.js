const MaxHeap = require('./max-heap.js');

class PriorityQueue {

	constructor(maxSize) {
		this.maxSize = 30;
		if(maxSize != null){
			this.maxSize = maxSize;
		}
		this.heap = new MaxHeap();
	}

	push(data, priority) {
		if(this.heap.size() == this.maxSize){
			throw "queue has max size"; 
		}
		this.heap.push(data,priority);
	}

	shift() {
		if(this.isEmpty()){
			throw "queue is empty"; 
		}
		return this.heap.pop();
	}

	size() {
		return this.heap.size();
	}
	
	isEmpty() {
		return this.heap.isEmpty();
	}
}

module.exports = PriorityQueue;
