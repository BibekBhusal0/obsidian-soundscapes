/**
 * An implementation of an Observable to subscribe to updates to a value
 */
class Observable {
    constructor(value) {
        this.subscribers = [];
        this.value = value;
    }
    /**
     * Set the value
     * @param value
     */
    setValue(value) {
        this.value = value;
        this.subscribers.forEach((callback) => callback(Object.assign({}, this.value)));
    }
    /**
     * Get the current value
     */
    getValue() {
        return this.value;
    }
    /**
     * Subscribe to changes in the value. Function returns a "unsubscribe" function to clean up as nessessary.
     * @param callback
     */
    onChange(callback) {
        this.subscribers.push(callback);
        return () => {
            this.subscribers = this.subscribers.filter((value) => value === callback);
        };
    }
}
export default Observable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT2JzZXJ2YWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIk9ic2VydmFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7QUFDSCxNQUFNLFVBQVU7SUFJZixZQUFZLEtBQVU7UUFGZCxnQkFBVyxHQUFlLEVBQUUsQ0FBQztRQUdwQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsUUFBUSxDQUFDLEtBQVU7UUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLFFBQVEsbUJBQU0sSUFBSSxDQUFDLEtBQUssRUFBRyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVEOztPQUVHO0lBQ0gsUUFBUTtRQUNQLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNuQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsUUFBUSxDQUFDLFFBQWtCO1FBQzFCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRWhDLE9BQU8sR0FBRyxFQUFFO1lBQ1gsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FDekMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssS0FBSyxRQUFRLENBQzdCLENBQUM7UUFDSCxDQUFDLENBQUM7SUFDSCxDQUFDO0NBQ0Q7QUFFRCxlQUFlLFVBQVUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBBbiBpbXBsZW1lbnRhdGlvbiBvZiBhbiBPYnNlcnZhYmxlIHRvIHN1YnNjcmliZSB0byB1cGRhdGVzIHRvIGEgdmFsdWVcclxuICovXHJcbmNsYXNzIE9ic2VydmFibGUge1xyXG5cdHByaXZhdGUgdmFsdWU7XHJcblx0cHJpdmF0ZSBzdWJzY3JpYmVyczogRnVuY3Rpb25bXSA9IFtdO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcih2YWx1ZTogYW55KSB7XHJcblx0XHR0aGlzLnZhbHVlID0gdmFsdWU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXQgdGhlIHZhbHVlXHJcblx0ICogQHBhcmFtIHZhbHVlXHJcblx0ICovXHJcblx0c2V0VmFsdWUodmFsdWU6IGFueSkge1xyXG5cdFx0dGhpcy52YWx1ZSA9IHZhbHVlO1xyXG5cdFx0dGhpcy5zdWJzY3JpYmVycy5mb3JFYWNoKChjYWxsYmFjaykgPT4gY2FsbGJhY2soeyAuLi50aGlzLnZhbHVlIH0pKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldCB0aGUgY3VycmVudCB2YWx1ZVxyXG5cdCAqL1xyXG5cdGdldFZhbHVlKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMudmFsdWU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTdWJzY3JpYmUgdG8gY2hhbmdlcyBpbiB0aGUgdmFsdWUuIEZ1bmN0aW9uIHJldHVybnMgYSBcInVuc3Vic2NyaWJlXCIgZnVuY3Rpb24gdG8gY2xlYW4gdXAgYXMgbmVzc2Vzc2FyeS5cclxuXHQgKiBAcGFyYW0gY2FsbGJhY2tcclxuXHQgKi9cclxuXHRvbkNoYW5nZShjYWxsYmFjazogRnVuY3Rpb24pIHtcclxuXHRcdHRoaXMuc3Vic2NyaWJlcnMucHVzaChjYWxsYmFjayk7XHJcblxyXG5cdFx0cmV0dXJuICgpID0+IHtcclxuXHRcdFx0dGhpcy5zdWJzY3JpYmVycyA9IHRoaXMuc3Vic2NyaWJlcnMuZmlsdGVyKFxyXG5cdFx0XHRcdCh2YWx1ZSkgPT4gdmFsdWUgPT09IGNhbGxiYWNrXHJcblx0XHRcdCk7XHJcblx0XHR9O1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgT2JzZXJ2YWJsZTtcclxuIl19