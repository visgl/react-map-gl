// Generated with
// flow-remove-types ./node_modules/mapbox-gl/src/util/task_queue.js

import assert from 'assert';

class TaskQueue {
  constructor() {
    this._queue = [];
    this._id = 0;
    this._cleared = false;
    this._currentlyRunning = false;
  }

  add(callback) {
    const id = ++this._id;
    const queue = this._queue;
    queue.push({callback, id, cancelled: false});
    return id;
  }

  remove(id) {
    const running = this._currentlyRunning;
    const queue = running ? this._queue.concat(running) : this._queue;
    for (const task of queue) {
      if (task.id === id) {
        task.cancelled = true;
        return;
      }
    }
  }

  run(timeStamp = 0) {
    assert(!this._currentlyRunning);
    const queue = (this._currentlyRunning = this._queue);

    // Tasks queued by callbacks in the current queue should be executed
    // on the next run, not the current run.
    this._queue = [];

    for (const task of queue) {
      if (task.cancelled) continue;
      task.callback(timeStamp);
      if (this._cleared) break;
    }

    this._cleared = false;
    this._currentlyRunning = false;
  }

  clear() {
    if (this._currentlyRunning) {
      this._cleared = true;
    }
    this._queue = [];
  }
}

export default TaskQueue;
