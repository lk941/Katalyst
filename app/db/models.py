from sqlalchemy import Column, Integer, String
from .database import Base

class TestScripts(Base):
    __tablename__ = "test_scripts"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    script_content = Column(String)
