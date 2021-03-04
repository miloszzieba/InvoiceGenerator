import { $,multiply,divide} from 'moneysafe';

export  function calculateRow(NettoPrice, Quantity, Vat)
{
	let NettoValue = multiply($(NettoPrice), $(Quantity)).toNumber().toFixed(2);
	let vatPercent = divide($(Vat.replace("%", "")),$(100));
	let VatValue = multiply($(NettoValue), $(vatPercent)).toNumber().toFixed(2);
	let GrossValue = $(NettoValue).plus($(VatValue)).toNumber().toFixed(2);

		return {
		NettoValue:isNaN( NettoValue)? 0 : NettoValue
		,VatValue:isNaN( VatValue)? 0 : VatValue
		,GrossValue:isNaN( GrossValue)? 0 : GrossValue
		}
}

export  function calculateSummaryTable(calTable)
{
 let NettoValueSum = $(0);
		let VatValueSum =  $(0);
        let GrossValueSum = $(0);

        calTable.forEach((x) => {
          NettoValueSum =  $(NettoValueSum).plus(x.NettoValue);
          VatValueSum =  $(VatValueSum).plus(x.VatValue);
          GrossValueSum =  $(GrossValueSum).plus(x.GrossValue);
        });

        return {
		NettoValueSum:isNaN( NettoValueSum) ? 0 : NettoValueSum
		, VatValueSum:isNaN( VatValueSum) ? 0 : VatValueSum
		, GrossValueSum:isNaN( GrossValueSum) ? 0 : GrossValueSum
		}
}