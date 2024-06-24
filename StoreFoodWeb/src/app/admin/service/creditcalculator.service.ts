import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreditcalculatorService {

  constructor() { }

  calculateEffectiveMonthlyRate(rateType: string, selectedRate: string, decimalRate: number) {
    let effectiveMonthlyRate = 0;
    if (rateType === "effective") {
      if (selectedRate === "daily") {
        effectiveMonthlyRate = Math.pow((1 + decimalRate), 30) - 1;
      } else if (selectedRate === "monthly") {
        effectiveMonthlyRate = decimalRate;
      } else if (selectedRate === "bimonthly") {
        effectiveMonthlyRate = Math.pow((1 + decimalRate), 1 / 2) - 1;
      } else if (selectedRate === "quarterly") {
        effectiveMonthlyRate = Math.pow((1 + decimalRate), 1 / 3) - 1;
      } else if (selectedRate === "four-month") {
        effectiveMonthlyRate = Math.pow((1 + decimalRate), 1 / 4) - 1;
      } else if (selectedRate === "semiannual") {
        effectiveMonthlyRate = Math.pow((1 + decimalRate), 1 / 6) - 1;
      } else if (selectedRate === "annual") {
        effectiveMonthlyRate = Math.pow((1 + decimalRate), 1 / 12) - 1;
      }
    } else if (rateType === "nominal") {
      let m = 0;
      let n = 0;
      if (selectedRate === "daily") {
        m = 1;
        n = 30;
      } else if (selectedRate === "biweekly") {
        m = 1 / 15;
        n = 2;
      } else if (selectedRate === "monthly") {
        m = 1 / 30;
        n = 1;
      } else if (selectedRate === "bimonthly") {
        m = 1 / 60;
        n = 1 / 2;
      } else if (selectedRate === "quarterly") {
        m = 1 / 90;
        n = 1 / 3;
      } else if (selectedRate === "four-month") {
        m = 1 / 120;
        n = 1 / 4;
      } else if (selectedRate === "semiannual") {
        m = 1 / 180;
        n = 1 / 6;
      } else if (selectedRate === "annual") {
        m = 1 / 360;
        n = 1 / 12;
      }
      effectiveMonthlyRate = (Math.pow((1 + decimalRate / m), n) - 1);
    }
    return effectiveMonthlyRate;
  }

  calculateCashFlow(creditData: any) {
    let cashFlows = [];
    let monthlyInterestRate = this.calculateEffectiveMonthlyRate(
      creditData.rateType,
      creditData.selectedRate,
      creditData.rateValue / 100
    );
    let creditLifeInsurance = creditData.creditLifeInsurance / 100;
    let totalPayments = creditData.closingDate;
    let totalGracePeriod = creditData.totalGracePeriod;
    let partialGracePeriod = creditData.partialGracePeriod;
    let finalFee = creditData.finalFee / 100 * creditData.vehiclePrice; // Usar vehiclePrice
    let montoPrestamo = creditData.creditFee / 100 * creditData.vehiclePrice + finalFee; // Usar vehiclePrice
    let netLoanAmount = montoPrestamo;
    let quota = (netLoanAmount * (monthlyInterestRate + creditLifeInsurance)) /
      (1 - Math.pow((1 + (monthlyInterestRate + creditLifeInsurance)), -totalPayments));

    for (let i = 1; i <= totalPayments + 1; i++) {
      if (i <= totalGracePeriod) {
        let interestPayment = netLoanAmount * monthlyInterestRate;
        let calculatedCreditLifeInsurance = creditLifeInsurance * netLoanAmount;
        let totalPayment = calculatedCreditLifeInsurance;
        cashFlows.push(-totalPayment);
        netLoanAmount += interestPayment;
      } else if (i > totalGracePeriod && i <= partialGracePeriod + totalGracePeriod) {
        let interestPayment = netLoanAmount * monthlyInterestRate;
        let calculatedCreditLifeInsurance = creditLifeInsurance * netLoanAmount;
        let totalPayment = calculatedCreditLifeInsurance + interestPayment;
        cashFlows.push(-totalPayment);
      } else if (i > partialGracePeriod + totalGracePeriod && i <= totalPayments) {
        let calculatedCreditLifeInsurance = creditLifeInsurance * netLoanAmount;
        let interestPayment = netLoanAmount * monthlyInterestRate;
        let totalPayment = quota + calculatedCreditLifeInsurance;
        cashFlows.push(-totalPayment);
        let amortization = quota - interestPayment - calculatedCreditLifeInsurance;
        netLoanAmount -= amortization;
      } else if (i === totalPayments + 1) {
        cashFlows.push(-finalFee);
      }
    }
    return cashFlows;
  }

  calculateVAN(initialInvestment: number, cashFlows: number[], COK: number) {
    let van = initialInvestment;
    let discountRate = Math.pow(1 + COK, 1 / 12) - 1;
    for (let i = 0; i < cashFlows.length; i++) {
      van += cashFlows[i] / Math.pow(1 + discountRate, i + 1);
    }
    return van;
  }

  calculateTIR(cashFlows: number[]) {
    const tolerance = 0.0001;
    let lowerBound = -1.0;
    let upperBound = 1.0;
    let guess = (lowerBound + upperBound) / 2;

    for (let i = 0; i < 100; i++) {
      let npv = 0;
      for (let j = 0; j < cashFlows.length; j++) {
        npv += cashFlows[j] / Math.pow(1 + guess, j);
      }

      if (Math.abs(npv) < tolerance) {
        return guess * 100;
      } else if (npv > 0) {
        upperBound = guess;
      } else {
        lowerBound = guess;
      }

      guess = (lowerBound + upperBound) / 2;
    }
    return guess * 100;
  }

  calculateTCEA(tirMensual: number) {
    const tirDecimal = tirMensual / 100;
    const tcea = Math.pow(1 + tirDecimal, 12) - 1;
    return tcea * 100;
  }
}