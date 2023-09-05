# OKCSouthStake.org - Project Overview and Structure
## Project Overview
OKCSouthStake.org is the official website for the Oklahoma City South Stake of The Church of Jesus Christ of Latter-day Saints. _(Note: this site is not maintained or reviewed by the Church, nor is it representative of the church as an organization.)_

This site was designed and built by [Joseph Hansen](https://github.com/josephclaytonhansen), a Communications Specialist for the Oklahoma City South Stake and full-stack web developer.

## Philosophy
This site is built using open-source software. All the code for this site is freely available and licensed under the MIT license. 

## High-level objectives
* Create a powerful, functional, site 
* Compartmentalize permissions - with many "cooks in the kitchen", giving users simple, easy tools that are constrained to only what they need avoids disaster
* Make components extremely fast and extremely lightweight 

## High level architecture
This site is running on Ubuntu servers, with CloudFlare providing bot security and other essential features. 

## Components
### Seabass
Seabass _(Simple Editor and Blog Application Server Software)_ is a web interface for creating and editing pages and posts on the main public-facing site. It is accessible at [seabass.okcsouthstake.org](https://seabass.okcsouthstake.org) to permitted users. 

#### Why create a new interface?
Seabass differs significantly from similar interfaces such as WordPress or Ghost.org in that it is *writer* focused. Most content editing platforms are created by developers, for developers. Seabass is specifically designed to be easy for content writers to use and meet all their needs in the simplest way possible.

_Big thanks to the Content Lead on this project, Denise Hansen, for her direction and guidance on achieving these goals!_

Seabass is also faster and smaller than other content editors, both on the server side and the client side. With lighter (and carefully engineered) network loads, Seabass is designed to work on anything from a desktop computer wired to fiber to a old mobile phone on the edge of cell coverage.

#### Technical Details
* Stack: MongoDB, Express, NodeJS
* Uses Nunjucks for templating
* Uses icons from [Lucide](https://lucide.dev)

#### Permissions
**Permissions for this instance of Seabass are unlikely to be granted.** If you truly feel you need access to Seabass, you can reach out to the [Oklahoma South Stake Communications Specialists](mailto:communications@okcsouthstake.org) with a detailed request. Prepare to be disappointed unless your circumstances are, at a minimum, extraordinary.

### Weasel
Weasel _(Ward Events and Services Electronic Listings)_ is a single-page-application for viewing and, for users with permissions, editing ward events and services. 

(Note: A *ward* is a congregation, a sub-unit of a *stake*.)

#### Technical Details 
* Stack: MongoDB, Vite, Vue, NodeJS
* State: Pinia

#### Weasel Viewer
For a normal user, Weasel allows them to see **Contacts**, **Events**, **Tools**, and **Worship** location and time for their ward. Thus, there are many instances of Weasel Viewer active- one for each ward. These are accessible at okcsouthstake.org/:ward, or :ward.okcsouthstake.org (see links below.)

##### Link Example
|Ward   | Sub-domain style | Page style |
|---|---|---|
| Choctaw | [choctaw.okcsouthstake.org](https://choctaw.okcsouthstake.org) | [okcsouthstake.org/choctaw](https://okcsouthstake.org/choctaw) |
| OKC 2nd | [okc-2nd.okcsouthstake.org](https://okc-2nd.okcsouthstake.org) | [okcsouthstake.org/okc-2nd](https://okcsouthstake.org/okc-2nd)
...

#### Weasel Editor
Users with elevated permissions can edit **Contacts**, **Events**, **Tools**, and **Worship** for their ward and organization. *(Note that not all organizations have access to edit **Worship** and **Tools**)*.

The Weasel Editor is accessed through [weasel.okcsouthstake.org](https://weasel.okcsouthstake.org). 

#### Permissions
Permissions are granted to relevant organization members in each ward. If you lack permissions or require updated permissions, [email us](mailto:communications@okcsouthstake.org) with a detailed request. 

## Usage expectations
### Normal access
Normal users (users with viewing permissions only) are expected to be respectful of server resources. Massive request loads, DDoS attacks, or other malicious behavior will result in automatic blocking. 

### Contributor access
Contributor permissions are given only to relevant members of the Oklahoma City South Stake.

Users with contributor permissions, including editing or creating any aspect of the site, should be aware that the site content is closely monitored and any instance of abuse will result in an immediate withdrawal of permissions from the abusive user. 

Please note that the definition of abuse in this context is *entirely at the discretion of the Communication Specialists*, but generally would include: 
* Adding *any* unrelated content, *any* form of spam, or *any* form of promotion or advertisement
* Adding *anything* beyond the scope of what you've been asked to add
* Adding *any* misinformation, including incorrect information or content errors 

Again, any of the above will result in **immediate withdrawal of all permissions.** 

#### Restoring permissions
Should permissions be removed from someone who is: 
* Demonstrably well-intentioned,
* A first or second-time offender,
* Demonstrably committed to improvement

Permissions may be restored to that user. There are *no* other circumstances where permissions will be restored. 

If you believe your permissions have been wrongfully revoked, please reach out to the[ communication specialists](mailto:communications@okcsouthstake.org) and we can discuss your situation. 

## Contact
Contact [communications@okcsouthstake.org](mailto:communications@okcsouthstake.org) with any site inquiries.

For technical questions, please reach out to [Joseph Hansen](https://github.com/josephclaytonhansen).

If something isn't working right on the site, please open a GitHub issue on this repository to report it. Please do not email bug reports.