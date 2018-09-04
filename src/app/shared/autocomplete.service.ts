// import { Pipe, Injectable, PipeTransform } from '@angular/core';

// // tslint:disable-next-line:use-pipe-transform-interface
// @Pipe({
// 	name: 'filterTest',
// 	pure: false
// })
// // This service it's a copy of Autocomplete service from HR app angualrjs
// // We might not use it!

// @Injectable()
// export class AutocompleteService implements PipeTransform {
// 	transform(array: any[], filter: any): any {
// 		const type = typeof filter;

// 		if (!array) {
// 			return array;
// 		}
// 	}

// 	public querySearch(query, list) {
// 		if (query && list) {
// 			const results = query
// 				? list.filter(this.createFilterFor(query))
// 				: list;
// 			return results;
// 		} else {
// 			return list;
// 		}
// 	}

// 	//  Build `components` list of key/value pairs
// 	public buildList(list, attributes) {
// 		let index = 0;

// 		if (!list || !list.length) {
// 			return null;
// 		} else {
// 			return list.map(function(item) {
// 				item.autoCompleteVal = '';
// 				for (index = 0; index < attributes.length; index++) {
// 					if (index !== 0 && item[attributes[index]]) {
// 						item.autoCompleteVal =
// 							item.autoCompleteVal +
// 							' ' +
// 							item[attributes[index]].toLowerCase();
// 					} else {
// 						item.autoCompleteVal = item[
// 							attributes[0]
// 						].toLowerCase();
// 					}
// 				}
// 				return item;
// 			});
// 		}
// 	}

// 	createFilterFor(query) {
// 		const lowercaseQuery = query.toLowerCase();
// 		// const lowercaseQuery = angular.lowercase(query);

// 		return function filterFn(item) {
// 			return item.autoCompleteVal
// 				? item.autoCompleteVal.includes(lowercaseQuery)
// 				: '';
// 		};
// 	}
// }
