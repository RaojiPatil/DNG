const takeToGoDaddy = (domainName) =>{
    const url = `https://in.godaddy.com/domainsearch/find?checkAvail=1&domainToCheck=${domainName}`;
	window.open(url, '_blank');
}

const takeToWhois = (domainName) => {
    const url = `https://in.godaddy.com/whois/results.aspx?domain=${domainName}`;
    window.open(url, '_blank');
};

export {takeToGoDaddy , takeToWhois}