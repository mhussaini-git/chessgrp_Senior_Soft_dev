graph TB
    subgraph Docker[Docker Environment]
        subgraph Frontend[Frontend Container]
            FE[React Frontend]
            WS[WebSocket Client]
            VP[Video Player Component]
        end

        subgraph Backend[Backend Container]
            API[FastAPI Backend]
            WS_SERVER[WebSocket Server]
            VH[Video Handler]
            subgraph Processing[Data Processing]
                VP_ENGINE[Video Processing Engine]
                META[Metadata Extractor]
            end
        end

        subgraph Database[Database Container]
            DB[(PostgreSQL)]
            subgraph Schema[DB Schema]
                VID_META[Video Metadata<br/>- video_id<br/>- timestamp<br/>- duration<br/>- resolution]
                USER_DATA[User Data<br/>- user_id<br/>- preferences]
            end
        end

        subgraph Storage[Storage Container]
            OBJ_STORE[(Object Storage)]
            subgraph Structure[Storage Structure]
                RAW[Raw Videos]
                PROC[Processed Videos]
            end
        end
    end

    %% Data Flow
    FE -->|"POST /upload<br/>multipart/form-data"| API
    FE -->|"GET /videos/{id}"| API
    FE <-->|"WS: live stream<br/>video chunks"| WS_SERVER
    
    API --> VH
    WS_SERVER --> VH
    VH --> VP_ENGINE
    VP_ENGINE --> META
    
    VH -->|"Store raw video"| OBJ_STORE
    VP_ENGINE -->|"Store processed video"| OBJ_STORE
    META -->|"Store metadata"| DB
    
    API -->|"Fetch video data"| OBJ_STORE
    API -->|"Query metadata"| DB
    
    VP <-->|"Video playback<br/>stream chunks"| WS

    style Frontend fill:#e6f3ff,stroke:#333,stroke-width:2px
    style Backend fill:#e6f3ff,stroke:#333,stroke-width:2px
    style Database fill:#e6f3ff,stroke:#333,stroke-width:2px
    style Storage fill:#e6f3ff,stroke:#333,stroke-width:2px
    
    style FE fill:#f9f9f9,stroke:#666
    style WS fill:#f9f9f9,stroke:#666
    style VP fill:#f9f9f9,stroke:#666
    style API fill:#f9f9f9,stroke:#666
    style WS_SERVER fill:#f