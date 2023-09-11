New note in Single page app diagram

sequenceDiagram
participant browser
participant server

browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
activate server
server-->browser: status 201 (created)
deactivate server
