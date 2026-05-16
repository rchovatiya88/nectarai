# MLS API & Real Estate Data Integration Research
## NECTAR.AI — MarketBee Technical Roadmap

**Date:** May 2026  
**Prepared for:** Ronak Chovatiya, CEO NECTAR.AI  
**Topic:** How to access real estate listing and sales data for CMA generation, compliance requirements, and recommended implementation path.

---

## 1. Executive Summary

MarketBee needs access to accurate, timely real estate transaction data to generate legitimate CMA reports. The gold standard is MLS (Multiple Listing Service) data. However, MLS access is regulated, restricted to licensed agents, and technically complex. This document outlines:

1. **The MLS Landscape** — How data flows and who controls it
2. **RESO Standards** — The modern API standard replacing RETS
3. **Alternative Data Sources** — Public records, Zillow, and other options
4. **Compliance Requirements** — NAR rules, data licensing, and legal considerations
5. **Recommended Implementation Path** — A 3-phase roadmap

---

## 2. The MLS Landscape

### What is an MLS?
An MLS is a private database of property listings maintained by local REALTOR associations. There are ~600 MLSs across the US. Each is independently operated. They contain the most accurate and timely real estate data available.

### Key Players
| Entity | Role |
|--------|------|
| **NAR** (National Association of REALTORS) | Trade association setting policy. Membership required for MLS access in most markets. |
| **Local MLSs** | Own the data. Examples: CRMLS (CA), MRIS (DC/MD/VA), MLSListings (Bay Area). |
| **MLS Vendors** | Build software for MLSs. Examples: CoreLogic, Black Knight, FBS (Flexmls). |
| **Data Aggregators** | License data from hundreds of MLSs. Examples: Zillow, Realtor.com, CoreLogic. |

### The Data Licensing Problem
MLS data is NOT freely available. It is owned by the local MLS and licensed under strict terms:
- **Display rules**: How the data can be shown (IDX vs VOW)
- **Attribution requirements**: Must credit source MLS
- **Update frequency**: Usually 15-min to 24-hr refresh
- **Prohibition on redistribution**: Cannot resell raw data

---

## 3. RESO Web API (The Modern Standard)

### What is RESO?
RESO (Real Estate Standards Organization) creates open data standards for real estate technology. RESO Web API is the modern replacement for the legacy RETS protocol.

### RESO Web API vs RETS
| Feature | RETS (Legacy) | RESO Web API (Current) |
|---------|--------------|------------------------|
| Protocol | XML-over-HTTP | REST + OData + JSON |
| Standard | Proprietary XML schema | Open standard |
| Performance | Bulk downloads | On-demand queries |
| Complexity | High (XML parsing) | Low (standard REST) |
| Adoption | Widespread but declining | Required for new certifications |

### Technical Details
- **Base standard**: OData v4 query protocol
- **Data model**: RESO Data Dictionary (common fields across all MLSs)
- **Authentication**: OAuth 2.0
- **Query syntax**: Standard OData `$filter`, `$select`, `$top`

#### Example Query
```
GET https://api.mls-provider.com/reso/odata/Property?
  $filter=City eq 'Austin' and PropertyType eq 'Residential'
  &$select=ListingId,ListPrice,BedroomsTotal,BathroomsTotalInteger,BuildingAreaTotal,LivingArea
  &$top=10
```

### RESO Certification
MLSs can be RESO Certified (Silver or Gold). As of 2026, ~85% of US listings are covered by RESO-certified MLSs. Gold certification means full RESO Web API + Data Dictionary compliance.

---

## 4. Access Pathways Ranked

### Path A: Direct MLS Access (Best Data, Hardest)
**Requirements:**
1. Be a licensed real estate agent
2. Join NAR ($150–$500/year)
3. Join local REALTOR association ($200–$800/year)
4. Join local MLS ($200–$1,200/year)
5. Apply for MLS data feed (additional fees)
6. Sign data licensing agreement
7. Build RESO/RETS client

**Cost:** $500–$2,500/year per market  
**Time to access:** 2–6 weeks  
**Data quality:** ⭐⭐⭐⭐⭐  
**Pros:** Most accurate, timely, comprehensive  
**Cons:** Requires agent license per market, cannot easily scale nationwide

**For NECTAR.AI:** We cannot access MLS data directly as a tech company. We need our customers (licensed agents) to connect their own MLS credentials.

---

### Path B: Bridge API / Zillow API (Good Data, Easier)
**Bridge Interactive** (owned by Zillow Group) offers a RESO-compliant API with data from ~100 MLSs.

**Setup:**
1. Apply for developer account at bridgeinteractive.com
2. Zillow reviews your use case
3. Sign data licensing agreement
4. Get OAuth credentials
5. Build against RESO Web API endpoints

**Cost:** $0.10–$0.50 per API call (transactional pricing)  
**Coverage:** ~100 MLSs, ~65% of US listings  
**Data quality:** ⭐⭐⭐⭐  
**Pros:** No agent license required, standardized API, good docs  
**Cons:** Expensive at scale, not all markets, usage restrictions

**For NECTAR.AI:** Best balance of data quality and accessibility. We can build a "Connect your MLS" flow where agents authenticate with Bridge API.

---

### Path C: Public Records / AVM APIs (Okay Data, Easiest)
Several commercial APIs offer property and sales data sourced from public records.

| Provider | Data Source | Pricing | Best For |
|----------|------------|---------|----------|
| **Zillow API** (legacy) | Public + user-submitted | Free tier / Paid | Estimates, not CMAs |
| **Realtor.com API** | MLS aggregated | Enterprise pricing | Large platforms |
| **Attom Data** | Public records | $0.10/record | Property info, not active listings |
| **DataTree (First American)** | Public records + AVM | Enterprise | Valuations, title data |
| **CoreLogic Trestle** | 300+ MLSs via single API | Per-market licensing | Enterprise platforms |
| **Estated** | Public records | $0.05/record | Basic property data |
| **Regrid** | Nationwide parcel data | $500/mo+ | Land/lot data |

**Cost:** $500–$5,000/mo for meaningful volume  
**Data quality:** ⭐⭐⭐ (public records lag 30–90 days)  
**Pros:** No licensing restrictions, nationwide coverage  
**Cons:** Not real-time, no active listings, less accurate than MLS

**For NECTAR.AI:** Use as fallback when MLS is unavailable. Good enough for preliminary estimates but NOT for client-facing CMAs.

---

### Path D: Screen Scraping (Don't Do This)
Scraping Zillow, Redfin, or Realtor.com:
- Violates Terms of Service
- Gets blocked by bot detection
- Data is inaccurate/incomplete
- Legal liability

**Recommendation:** NEVER do this for a commercial product.

---

## 5. Compliance Requirements

### NAR (National Association of REALTORS) Rules
1. **Clear Cooperation Policy**: Listings must be submitted to MLS within 1 business day of marketing
2. **IDX (Internet Data Exchange) Rules**: How listings can be displayed publicly
3. **VOW (Virtual Office Website) Rules**: For registered user-only displays
4. **Article 12**: REALTORS must present a true picture in advertising

### MLS Data Licensing Terms (Typical)
- **Attribution**: Must display "Data provided by [MLS Name]"
- **Update frequency**: Must refresh data per MLS requirements
- **No commingling**: Cannot mix MLS data with non-MLS data in confusing ways
- **No redistribution**: End users cannot download bulk data
- **Display restrictions**: Cannot show sold data publicly in some markets

### Legal Considerations
- **NAR Settlement (2024)**: Changed commission rules. CMAs must be agent-branded, not platform-branded.
- **Consumer protection**: CMAs must include disclaimers ("Not an appraisal")
- **State licensing**: Some states regulate CMA generation tools

### Required Disclaimers
Every CMA report must include:
```
This Comparative Market Analysis (CMA) is prepared by [Agent Name] 
and is based on data from [MLS Name]. It is not an appraisal. 
Actual market value may vary. Data current as of [Date].
```

---

## 6. Recommended Implementation Roadmap

### Phase 1: Demo Mode (NOW — Month 1)
**What:** Fully functional CMA demo with synthetic/mock data  
**Purpose:** Sell to agents, validate demand, get feedback  
**Technical:** Client-side generation (already built in CMADemo.tsx)  
**Compliance:** None — clearly labeled as simulation  
**Cost:** $0

### Phase 2: Public Records Layer (Month 2–3)
**What:** Integrate Attom, Estated, or Regrid for real property data  
**Purpose:** Provide directionally accurate estimates nationwide  
**Technical:** REST API integration, caching layer  
**Compliance:** Standard API terms  
**Cost:** $500–$2,000/mo

### Phase 3: MLS Integration via Bridge API (Month 3–6)
**What:** Partner with Bridge Interactive (Zillow Group)  
**Purpose:** Real, client-ready CMAs with MLS data  
**Technical:** OAuth 2.0 connection flow per agent, RESO Web API client  
**Compliance:** Bridge licensing + agent-branded reports  
**Cost:** Usage-based ($0.10–$0.50/call)

### Phase 4: Direct MLS Partnerships (Month 6–12)
**What:** White-label agreements with top 20 MLSs  
**Purpose:** Best pricing and deepest data access  
**Technical:** RESO Web API + custom MLS integrations  
**Compliance:** Direct MLS licensing  
**Cost:** Per-MLS fees

---

## 7. Technical Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    MarketBee CMA Engine                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Bridge API │  │  Public Recs │  │   Mock Data  │      │
│  │   (Primary)  │  │  (Fallback)  │  │   (Demo)     │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                 │                 │               │
│         └─────────────────┴─────────────────┘               │
│                         │                                   │
│              ┌──────────▼──────────┐                       │
│              │   Data Normalizer   │                       │
│              │  (RESO Dictionary)  │                       │
│              └──────────┬──────────┘                       │
│                         │                                   │
│              ┌──────────▼──────────┐                       │
│              │   Valuation Model   │                       │
│              │  (Adjustments, ML)  │                       │
│              └──────────┬──────────┘                       │
│                         │                                   │
│              ┌──────────▼──────────┐                       │
│              │   Report Generator  │                       │
│              │  (PDF, Web, Email)  │                       │
│              └─────────────────────┘                       │
└─────────────────────────────────────────────────────────────┘
```

### Key Components to Build
1. **OAuth Connector**: Bridge API auth flow
2. **Data Normalizer**: Map different data sources to unified schema
3. **Comp Selection Engine**: Find and rank comparable properties
4. **Adjustment Calculator**: Bed/bath/sqft/condition adjustments
5. **Valuation Model**: Weighted average + confidence intervals
6. **Report Generator**: Branded PDF + web view
7. **Cache Layer**: Redis for recent queries

---

## 8. Pricing Model for Data

| Data Source | Unit Cost | Monthly Cost (1,000 CMAs) |
|------------|-----------|---------------------------|
| Mock/Demo | $0 | $0 |
| Public Records | $0.05/record | $250 |
| Bridge API | $0.25/CMA | $250 |
| Direct MLS | $50–$500/mo | $500 |

**Recommendation:** Build on mock data → add public records → add Bridge API. Pass data costs through to customers as a usage fee or include in the $399/mo base price.

---

## 9. Immediate Next Steps

1. **Apply for Bridge API developer account** → bridgeinteractive.com/contact
2. **Review RESO Data Dictionary** → reso.org/data-dictionary
3. **Talk to 3 real estate agents** about their current CMA tools
4. **Decide on PDF generation library** → react-pdf, Puppeteer, or jsPDF
5. **Design the "Connect MLS" UX flow** → OAuth + market selection
6. **Legal review** → Have a real estate attorney review report disclaimers

---

## 10. Key Contacts

| Organization | Contact | Purpose |
|-------------|---------|---------|
| RESO | reso.org/membership | Standards education |
| Bridge Interactive | bridgeinteractive.com | API access |
| CoreLogic Trestle | trestle.corelogic.com | Enterprise MLS |
| NAR | realtor.org | Policy/compliance |

---

*This research was generated by NECTAR.AI's internal DataBee. For questions, reach out to the product team.*
