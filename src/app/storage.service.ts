import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  // Method to save data to localStorage
  saveData(key: string, value: any): void {
    try {
      const jsonValue = JSON.stringify(value);
      localStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Error saving data to localStorage', error);
    }
  }
  // Method to retrieve data from localStorage
  getData(key: string): any { 
    try {
      const jsonValue = localStorage.getItem(key);
      return jsonValue ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error retrieving data from localStorage', error);
      return null;
    }
  }
  // Method to remove data from localStorage
  removeData(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing data from localStorage', error);
    }
  }
  // Method to clear all data from localStorage
  clearData(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage', error);
    }
  }
  // Method to check if a key exists in localStorage
  keyExists(key: string): boolean { 
    try {
      return localStorage.getItem(key) !== null;
    } catch (error) {
      console.error('Error checking key existence in localStorage', error);
      return false;
    }
  } 
}
